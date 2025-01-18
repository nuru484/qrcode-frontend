// Custom API Error class remains the same
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
const baseURL = `${serverURL}/api/v1`;

// Default request timeout function
const timeout = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new APIError('Request timeout', 0, 'TIMEOUT_ERROR'));
    }, ms);
  });
};

// Helper to combine base URL with endpoint
const createURL = (endpoint) => {
  return `${baseURL}${endpoint}`;
};

// Core fetch function with timeout and error handling
async function fetchWithTimeout(url, options = {}) {
  try {
    const controller = new AbortController();
    const timeoutDuration = options.timeout || 10000;

    const response = await Promise.race([
      fetch(url, {
        ...options,
        credentials: 'include', // Equivalent to withCredentials
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      }),
      timeout(timeoutDuration),
    ]);

    const data = await response.json();

    if (!response.ok) {
      let message = 'An error occurred';
      let details = null;

      if (data.errors && Array.isArray(data.errors)) {
        message = data.errors.map((err) => err.message).join(', ');
        details = data.errors;
      } else if (data.message) {
        message = data.message;
      }

      const type = data.type || 'UNKNOWN_ERROR';
      const status = response.status;

      if (status === 400 || status === 422) {
        throw new APIError(message, status, 'VALIDATION_ERROR', details);
      }

      console.log(`message: ${message}`);
      throw new APIError(message, status, type);
    }

    return data;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    if (error.name === 'AbortError') {
      throw new APIError('Request was aborted', 0, 'ABORT_ERROR');
    }

    if (!navigator.onLine || error instanceof TypeError) {
      throw new APIError('Network error', 0, 'NETWORK_ERROR');
    }

    throw new APIError('An unexpected error occurred', 0, 'UNEXPECTED_ERROR');
  }
}

// API client implementation
const api = {
  async get(endpoint, options = {}) {
    return fetchWithTimeout(createURL(endpoint), {
      ...options,
      method: 'GET',
    });
  },

  async post(endpoint, data, options = {}) {
    return fetchWithTimeout(createURL(endpoint), {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async put(endpoint, data, options = {}) {
    return fetchWithTimeout(createURL(endpoint), {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async patch(endpoint, data, options = {}) {
    return fetchWithTimeout(createURL(endpoint), {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  async delete(endpoint, options = {}) {
    return fetchWithTimeout(createURL(endpoint), {
      ...options,
      method: 'DELETE',
    });
  },
};

export { api, APIError };
