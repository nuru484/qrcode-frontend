import { Bell, Search, QrCode, Calendar, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';

const Dashboard = () => {
  const stats = {
    upcomingEvents: 5,
    attendanceRate: '87%',
    notifications: 3,
  };

  const recentActivities = [
    {
      id: 1,
      type: 'registration',
      event: 'Tech Conference 2025',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'attendance',
      event: 'Workshop: React Basics',
      time: '1 day ago',
    },
    { id: 3, type: 'update', event: 'Team Meeting', time: '2 days ago' },
  ];

  const alerts = [
    { id: 1, message: 'AI Summit starts in 2 hours', type: 'reminder' },
    {
      id: 2,
      message: "Missing attendance for yesterday's workshop",
      type: 'warning',
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

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-500" />
          <Input
            className="pl-10 w-full border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500 rounded-lg shadow-sm"
            placeholder="Search events, participants, or attendance records..."
          />
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Upcoming Events',
              icon: Calendar,
              value: stats.upcomingEvents,
            },
            {
              title: 'Attendance Rate',
              icon: Users,
              value: stats.attendanceRate,
            },
            { title: 'Notifications', icon: Bell, value: stats.notifications },
          ].map((stat, index) => (
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
          <CardContent className="flex gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm transition-colors duration-200">
              <QrCode className="h-4 w-4" />
              Scan QR Code
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 rounded-lg shadow-sm transition-colors duration-200">
              Generate QR Code
            </button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-none shadow-lg bg-white mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-900">
              <Clock className="h-5 w-5 text-emerald-500" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between border-b border-emerald-100 pb-4 hover:bg-emerald-50 p-2 rounded-lg transition-colors duration-200"
                >
                  <div>
                    <div className="font-medium text-emerald-900">
                      {activity.event}
                    </div>
                    <div className="text-sm text-emerald-600 capitalize">
                      {activity.type}
                    </div>
                  </div>
                  <div className="text-sm text-emerald-500">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts/Reminders */}
        <div className="space-y-4 mt-8">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              className={`border-l-4 ${
                alert.type === 'warning'
                  ? 'border-l-amber-500 bg-amber-50'
                  : 'border-l-emerald-500 bg-emerald-50'
              }`}
            >
              <AlertDescription className="flex items-center gap-2 text-emerald-800">
                <Bell
                  className={`h-4 w-4 ${
                    alert.type === 'warning'
                      ? 'text-amber-500'
                      : 'text-emerald-500'
                  }`}
                />
                {alert.message}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
