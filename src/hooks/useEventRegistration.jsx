import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  checkEventRegistrationStatus,
  registerForEvent,
  unRegisterForEvent,
} from '@/api/eventRegistration';

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

export const useRegisterForEvent = () => {
  const mutation = useMutation({
    mutationFn: registerForEvent,
    onError: (error) => {
      console.error('Event registration failed:', error);
    },
  });

  return mutation;
};

export const useUnRegisterForEvent = () => {
  const mutation = useMutation({
    mutationFn: unRegisterForEvent,
    onError: (error) => {
      console.error('Event unregistration failed:', error);
    },
  });

  return mutation;
};
