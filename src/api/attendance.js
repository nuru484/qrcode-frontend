import { api } from '.';

export const markAttendance = async (credentials) => {
  return await api.post(`attendance`, credentials);
};
