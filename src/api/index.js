import axios from 'axios';

class APIError extends Error {
  constructor(message, status, type, details = null) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.type = type;
    this.details = details;
  }
}

const serverURL = import.meta.env.VITE_SERVER_URL;

const api = axios.create({
  baseURL: `${serverURL}/api/v1`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.defaults.withCredentials = true;

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Automatically parse JSON responses
    return response.data;
  },
  async (error) => {
    if (error.response) {
      // Server-side error
      const { data, status } = error.response;

      // If errors are available in response, extract the messages
      let message = 'An error occurred'; // Default message
      if (data.errors && Array.isArray(data.errors)) {
        // If there are multiple validation errors, we join them into a single message
        message = data.errors.map((err) => err.message).join(', ');
      } else if (data.message) {
        // Fallback if there's a top-level message
        message = data.message;
      }

      const type = data.type || 'UNKNOWN_ERROR';
      const details = data.errors || null;

      if (status === 400 || status === 422) {
        throw new APIError(message, status, 'VALIDATION_ERROR', details);
      }

      console.log(`message: ${message}`);
      throw new APIError(message, status, type);
    } else if (error.request) {
      // Network error
      throw new APIError('Network error', 0, 'NETWORK_ERROR');
    } else if (error.message === 'canceled') {
      // Request aborted
      throw new APIError('Request was aborted', 0, 'ABORT_ERROR');
    }

    throw new APIError('An unexpected error occurred', 0, 'UNEXPECTED_ERROR');
  }
);

export { api, APIError };
