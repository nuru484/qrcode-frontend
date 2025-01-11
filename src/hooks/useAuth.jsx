import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUser, login } from '@/api/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const refetchUser = () => queryClient.invalidateQueries(['user']); // Invalidate to trigger a refetch

  return { user, isLoading, isError, error, refetchUser };
};

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: login,
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  return mutation;
};
