import { api } from '.';

export const checkEventRegistrationStatus = async (credentials) => {
  return await api.get(`event/registration/status`, credentials);
};
