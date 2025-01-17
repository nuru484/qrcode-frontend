import { api } from '.';

export const fetchUser = async () => {
  return await api.get('/auth/user');
};

export const login = async (credentials) => {
  return await api.post('/auth/login', { credentials });
};

export const signup = async (credentials) => {
  return await api.post('/register', credentials);
};

export const logout = async () => {
  return await api.post('/auth/logout');
};
