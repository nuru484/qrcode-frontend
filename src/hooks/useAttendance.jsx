import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  markAttendance,
  fetchUserAttendedEvents,
  fetchEventAttendance,
  fetchTotalAttendance,
} from '@/api/attendance';

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

export const useEventAttendance = (eventId) => {
  const queryClient = useQueryClient();

  const {
    data: eventAttendance,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['eventAttendance', eventId],
    queryFn: () => fetchEventAttendance(eventId),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const refetchEventAttendance = () =>
    queryClient.invalidateQueries(['eventAttendance', eventId]);

  return {
    eventAttendance,
    isLoading,
    isError,
    error,
    refetchEventAttendance,
  };
};

export const useTotalAttendance = () => {
  const queryClient = useQueryClient();

  const {
    data: totalAttendance,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['totalAttendance'],
    queryFn: () => fetchTotalAttendance(),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    retry: 2,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  const refetchTotalAttendance = () =>
    queryClient.invalidateQueries(['totalAttendance']);

  return {
    totalAttendance,
    isLoading,
    isError,
    error,
    refetchTotalAttendance,
  };
};
