import { api } from '.';

export const fetchEvent = async (eventId) => {
  return await api.get(`/event/${eventId}`);
};

export const fetchEvents = async () => {
  return await api.get(`/event`);
};

export const createEvent = async (credentials) => {
  return await api.post(`/event`, credentials);
};
