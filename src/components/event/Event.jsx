import React from 'react';
import { useEvent } from '@/hooks/useEvent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar,
  MapPin,
  Tag,
  Users,
  ClipboardList,
  ArrowLeft,
  Pencil,
  Trash,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const Event = () => {
  const { id } = useParams();
  const { event, isLoading, isError, error } = useEvent(id);
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="text-red-500">Error: {error.message}</div>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </CardContent>
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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      navigate('/dashboard');
    }
  };

  const handleUpdate = () => {
    navigate(`/dashboard/update-event/${id}`);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center">
        <Button
          variant="ghost"
          className="self-start p-0 md:px-4 md:py-2 md:self-auto mb-2 md:mb-0"
          onClick={() => navigate(`/dashboard/events`)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2 justify-between">
          <Button variant="outline" onClick={handleUpdate}>
            <Pencil className="w-4 h-4 " />
            Edit
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            <Trash className="w-4 h-4 " />
            Delete
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <div>
          <CardTitle className="text-2xl mb-2">{title}</CardTitle>
          <div className="flex items-center text-gray-500 mb-2">
            <Tag className="w-4 h-4 mr-2" />
            {category}
          </div>
        </div>

        <p className="text-gray-700">{description}</p>

        <div className="flex flex-col space-y-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(date).toLocaleString()}
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {location}
          </div>

          <div className="flex gap-4">
            {isPastEvent && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Attendance ({Attendance?.length || 0})
              </div>
            )}
            <div className="flex items-center">
              <ClipboardList className="w-4 h-4 mr-2" />
              Registrations ({Registration?.length || 0})
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Event;
