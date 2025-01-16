import { useMutation } from '@tanstack/react-query';

import { markAttendance } from '@/api/attendance';

export const useMarkAttendance = () => {
  const mutation = useMutation({
    mutationFn: markAttendance,
    onError: (error) => {
      console.error('Attendance marking failed:', error);
    },
  });

  return mutation;
};
