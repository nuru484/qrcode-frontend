import { useEvent } from '@/hooks/useEvent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Tag, Users, ClipboardList } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const Event = () => {
  const { id } = useParams();
  const { event, isLoading, isError, error } = useEvent(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className="w-11/12 max-w-2xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-11/12 max-w-2xl mx-auto mt-8  border-red-600">
        <div className="flex items-center justify-center flex-wrap">
          <CardContent className="p-6">
            <p className="text-red-500 font-medium">Error: {error.message}</p>
          </CardContent>
          <Button
            className="bg-emerald-600 m-4 hover:bg-emerald-500"
            onClick={() => {
              navigate('/dashboard/STUDENT');
            }}
          >
            Home
          </Button>
        </div>
      </Card>
    );
  }

  const {
    title,
    description,
    date,
    location,
    category,
    Attendance,
    Registration,
  } = event?.data || {};

  const isPastEvent = new Date(date) > new Date();

  return (
    <div>
      <Card className="w-full mx-auto my-4 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <div className="flex items-center text-gray-500 text-sm">
            <Tag className="w-4 h-4 mr-1" />
            {category}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <p className="text-gray-600">{description}</p>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Calendar className="w-5 h-5" />
              <span>{new Date(date).toLocaleString()}</span>
            </div>

            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{location}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            {isPastEvent && (
              <Button variant="outline" className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Attendance ({Attendance?.length || 0})</span>
              </Button>
            )}

            <Button variant="outline" className="flex items-center space-x-2">
              <ClipboardList className="w-4 h-4" />
              <span>Registrations ({Registration?.length || 0})</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Event;
