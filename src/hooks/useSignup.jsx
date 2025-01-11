import { useMutation } from '@tanstack/react-query';

import { signup } from '@/api/auth';

export const useSignup = () => {
  const mutation = useMutation({
    mutationFn: signup,
  });

  return mutation;
};
