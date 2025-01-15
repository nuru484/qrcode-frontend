import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUser, login, logout } from '@/api/auth';
import { useNavigate } from 'react-router-dom';

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

  const refetchUser = () => queryClient.invalidateQueries(['user']);

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

export const useLogout = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/login');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  return mutation;
};
