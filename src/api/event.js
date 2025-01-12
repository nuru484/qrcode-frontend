import { api } from '.';

export const fetchEvent = async (eventId) => {
  return await api.get(`/event/${eventId}`);
};

export const fetchEvents = async () => {
  return await api.get(`/event`);
};
