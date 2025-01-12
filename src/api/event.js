import { api } from '.';

export const fetchEvent = async (eventId) => {
  return await api.get(`/event/${eventId}`);
};
