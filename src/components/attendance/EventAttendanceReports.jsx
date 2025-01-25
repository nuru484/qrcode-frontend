import { Card, CardContent } from '@/components/ui/card';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEventAttendance } from '@/hooks/useAttendance';
import { useEvent } from '@/hooks/useEvent';
import {
  Users,
  UserCheck,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  CalendarCheck,
} from 'lucide-react';

const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  onClick,
  suffix = '',
}) => (
  <Card
    className="hover:shadow-lg transition-shadow cursor-pointer"
    onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-sm text-gray-500">{title}</span>
        </div>
        {trend && (
          <div
            className={`flex items-center ${
              trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend > 0 ? (
              <ArrowUpRight className="w-4 h-4" />
            ) : (
              <ArrowDownRight className="w-4 h-4" />
            )}
            <span className="text-xs">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="mt-3">
        <span className="text-2xl font-bold">
          {value}
          {suffix}
        </span>
      </div>
    </CardContent>
  </Card>
);

MetricCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType.isRequired,
  trend: PropTypes.number,
  onClick: PropTypes.func,
  suffix: PropTypes.string,
};

const EventAttendanceReports = () => {
  const { eventId } = useParams();

  const { event } = useEvent(eventId);

  const { eventAttendance } = useEventAttendance(eventId);

  const totalRegistrations = event?.data?.Registration.length;

  const totalAttendancesCount = eventAttendance?.data.length || 0;

  const totalAttendances = totalAttendancesCount;

  const attendanceRate =
    eventAttendance?.data.length > 0
      ? totalAttendancesCount / totalRegistrations
      : 0;

  let averageArrivalTime = 'N/A';

  const arrivalTimes = eventAttendance?.data
    .filter((item) => item.attended && item.attendanceStartTime)
    .map((item) => new Date(item.attendanceStartTime));

  if (arrivalTimes?.length > 0) {
    const averageTime =
      arrivalTimes.reduce((acc, time) => acc + time.getTime(), 0) /
      arrivalTimes.length;

    averageArrivalTime = new Date(averageTime)
      .toISOString()
      .split('T')[1]
      .split('.')[0];
  }

  const onTimeCount = eventAttendance?.data.filter(
    (item) => item.attended && item.attendanceStartTime
  ).length;

  const onTimePercentage =
    (onTimeCount / eventAttendance?.data.length) * 100 || 0;

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Attendance Report</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Total Registrations"
          value={totalRegistrations}
          icon={Users}
        />
        <MetricCard
          title="Total Attendance"
          value={totalAttendances}
          icon={UserCheck}
        />
        <MetricCard
          title="Attendance Rate"
          value={(attendanceRate * 100).toFixed(1)}
          icon={Percent}
          suffix="%"
        />
        <MetricCard
          title="Average Arrival Time"
          value={averageArrivalTime || 'N/A'}
          icon={Clock}
        />
        <MetricCard
          title="On-Time Rate"
          value={onTimePercentage.toFixed(1)}
          icon={CalendarCheck}
          suffix="%"
        />
      </div>
    </div>
  );
};

export default EventAttendanceReports;
