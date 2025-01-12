import { useQuery, useQueryClient } from '@tanstack/react-query';
import { checkEventRegistrationStatus } from '@/api/eventRegistration';

export const useCheckEventRegistrationStatus = (credentials) => {
  const queryClient = useQueryClient();

  const {
    data: status,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['status'],
    queryFn: () => checkEventRegistrationStatus(credentials),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: 3,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const refetchEventRegistrationStatus = () =>
    queryClient.invalidateQueries(['status']);

  return { status, isLoading, isError, error, refetchEventRegistrationStatus };
};
