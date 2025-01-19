import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUser, login } from '@/api/auth';
import { useNavigate } from 'react-router-dom';
import encryptStorage from '@/lib/encryptedStorage';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
  });

  const refetchUser = () => queryClient.invalidateQueries(['user']);

  return { user, isLoading, isError, error, refetchUser };
};

export const useLogin = () => {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      console.log('login success.');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  return mutation;
};

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await encryptStorage.removeItem('jwtAccessToken');
      await encryptStorage.removeItem('jwtRefreshToken');
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return logout;
};
