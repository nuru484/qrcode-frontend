import { api } from '.';

export const checkEventRegistrationStatus = async (credentials) => {
  return await api.get(`event/registration/status`, credentials);
};

export const registerForEvent = async (credentials) => {
  return await api.post('event/registration', credentials);
};

export const unRegisterForEvent = async (credentials) => {
  return await api.delete('event/registration', credentials);
};
