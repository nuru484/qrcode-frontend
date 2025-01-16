import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PropTypes from 'prop-types';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  UserCheck,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  CalendarCheck,
} from 'lucide-react';

// Mock data for the attendance trend
const trendData = [
  { date: '2024-01-01', attendance: 45, registered: 50 },
  { date: '2024-01-02', attendance: 42, registered: 50 },
  { date: '2024-01-03', attendance: 48, registered: 52 },
  { date: '2024-01-04', attendance: 51, registered: 55 },
  { date: '2024-01-05', attendance: 47, registered: 55 },
  { date: '2024-01-06', attendance: 49, registered: 58 },
  { date: '2024-01-07', attendance: 53, registered: 60 },
];

const EventAttendanceReports = () => {
  // Mock metrics data
  const metrics = {
    totalRegistrations: 60,
    totalAttendance: 53,
    attendanceRate: 88.3,
    avgArrivalTime: '9:45 AM',
    onTimeRate: 92,
    lastWeekChange: 15,
  };

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

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Event Attendance Report</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Total Registrations"
          value={metrics.totalRegistrations}
          icon={Users}
          trend={metrics.lastWeekChange}
        />
        <MetricCard
          title="Total Attendance"
          value={metrics.totalAttendance}
          icon={UserCheck}
          trend={metrics.lastWeekChange}
        />
        <MetricCard
          title="Attendance Rate"
          value={metrics.attendanceRate}
          icon={Percent}
          suffix="%"
        />
        <MetricCard
          title="Average Arrival Time"
          value={metrics.avgArrivalTime}
          icon={Clock}
        />
        <MetricCard
          title="On-Time Rate"
          value={metrics.onTimeRate}
          icon={CalendarCheck}
          suffix="%"
        />
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  stroke="#2563eb"
                  name="Attendance"
                />
                <Line
                  type="monotone"
                  dataKey="registered"
                  stroke="#9333ea"
                  name="Registered"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventAttendanceReports;