import { createContext, useContext, useEffect, useState } from 'react';
import { useEventAttendance } from '@/hooks/useAttendance';
import { useParams } from 'react-router-dom';

export const AttendanceReportContext = createContext({
  totalRegistrations: 0,
  totalAttendances: 0,
  attendanceRate: 0,
  averageArrivalTime: null,
  onTimePercentage: 0,
});

export const useAttendanceReportContext = () =>
  useContext(AttendanceReportContext);

// eslint-disable-next-line react/prop-types
export const AttendanceReportContextProvider = ({ children }) => {
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [totalAttendances, setTotalAttendances] = useState(0);
  const [attendanceRate, setAttendanceRate] = useState(0);
  const [averageArrivalTime, setAverageArrivalTime] = useState(null);
  const [onTimePercentage, setOnTimePercentage] = useState(0);

  const { eventId } = useParams();

  const { eventAttendance } = useEventAttendance(eventId);

  useEffect(() => {
    if (eventAttendance && Array.isArray(eventAttendance.data)) {
      const totalAttendancesCount = eventAttendance.data.length;

      setTotalAttendances(totalAttendancesCount);

      // Calculate attendance rate
      setAttendanceRate(
        eventAttendance.data.length > 0
          ? totalAttendancesCount / eventAttendance.data.length
          : 0
      );

      const arrivalTimes = eventAttendance.data
        .filter((item) => item.attended && item.attendanceStartTime)
        .map((item) => new Date(item.attendanceStartTime));

      if (arrivalTimes.length > 0) {
        const averageTime =
          arrivalTimes.reduce((acc, time) => acc + time.getTime(), 0) /
          arrivalTimes.length;
        setAverageArrivalTime(new Date(averageTime).toISOString());
      } else {
        setAverageArrivalTime(null);
      }

      const onTimeCount = eventAttendance.data.filter(
        (item) => item.attended && item.attendanceStartTime
      ).length;
      setOnTimePercentage(
        eventAttendance.data.length > 0
          ? (onTimeCount / eventAttendance.data.length) * 100
          : 0
      );
    }
  }, [eventAttendance]);

  return (
    <AttendanceReportContext.Provider
      value={{
        totalRegistrations,
        totalAttendances,
        attendanceRate,
        averageArrivalTime,
        onTimePercentage,
      }}
    >
      {children}
    </AttendanceReportContext.Provider>
  );
};
