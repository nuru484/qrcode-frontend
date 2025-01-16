import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { markAttendance, fetchUserAttendedEvents } from '@/api/attendance';

export const useMarkAttendance = () => {
  const mutation = useMutation({
    mutationFn: markAttendance,
    onError: (error) => {
      console.error('Attendance marking failed:', error);
    },
  });

  return mutation;
};

export const useUserAttendedEvents = (userId) => {
  const queryClient = useQueryClient();

  const {
    data: userAttendedEvents,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['userAttendedEvents', userId],
    queryFn: () => fetchUserAttendedEvents(userId),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const refetchUserAttendedEvents = () =>
    queryClient.invalidateQueries(['userAttendedEvents', userId]);

  return {
    userAttendedEvents,
    isLoading,
    isError,
    error,
    refetchUserAttendedEvents,
  };
};
