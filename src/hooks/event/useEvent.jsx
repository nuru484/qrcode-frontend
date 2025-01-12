import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchEvent } from '@/api/event';

export const useEvent = (eventId) => {
  const queryClient = useQueryClient();

  const {
    data: event,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => fetchEvent(eventId),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const refetchEvent = () => queryClient.invalidateQueries(['event', eventId]);

  return { event, isLoading, isError, error, refetchEvent };
};
