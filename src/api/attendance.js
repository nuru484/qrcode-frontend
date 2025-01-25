import { api } from '.';

export const markAttendance = async (credentials) => {
  return await api.post(`attendance`, credentials);
};

export const fetchUserAttendedEvents = async (id) => {
  return await api.get(`/attendance/user/${id}`);
};

export const fetchEventAttendance = async (id) => {
  return await api.get(`/attendance/event/${id}`);
};

export const fetchTotalAttendance = async () => {
  return await api.get(`/attendance/`);
};
