import { Bell, QrCode, Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEvents } from '@/hooks/useEvent';
import { useTotalAttendance } from '@/hooks/useAttendance';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { events } = useEvents();
  const { totalAttendance } = useTotalAttendance();
  const navigate = useNavigate();

  const availableEvents = events?.data.length;
  const attendanceRate = (
    totalAttendance?.data.length / availableEvents
  ).toFixed(2);

  const today = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const upcomingEvents = events?.data.filter((event) => {
    const eventDate = new Date(event.date);
    const difference = Math.abs(today - eventDate);
    return difference <= oneDay;
  });

  const stats = [
    {
      title: 'Available Events',
      icon: Calendar,
      value: availableEvents,
    },
    {
      title: 'Attendance Rate',
      icon: Users,
      value: attendanceRate,
    },
    {
      title: 'Upcoming Events',
      icon: Bell,
      value: upcomingEvents?.length,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900">
            Event Dashboard
          </h1>
          <p className="text-emerald-600 mt-2">
            Welcome back, manage your events and track attendance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-none shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-900">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-5 w-5 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-emerald-700">
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* QR Code Scanner/Generator */}
        <Card className="border-none shadow-lg bg-white mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-900">
              <QrCode className="h-5 w-5 text-emerald-500" />
              QR Code Tools
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center md:justify-normal md:flex-nowrap gap-4">
            <button
              onClick={() => navigate('/dashboard/registration/scan-qr-code')}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-colors duration-200"
            >
              <QrCode className="h-4 w-4" />
              Scan QR Code
            </button>
            <button
              onClick={() => navigate('/dashboard/events')}
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 rounded-lg shadow-sm transition-colors duration-200"
            >
              Generate QR Code
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
