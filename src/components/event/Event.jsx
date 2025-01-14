import { useEvent, useEvents, useDeleteEvent } from '@/hooks/useEvent';
import { useEffect } from 'react';
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
import { useAuth } from '@/hooks/useAuth';
import {
  useRegisterForEvent,
  useUnRegisterForEvent,
} from '@/hooks/useEventRegistration';

const Event = () => {
  const { id } = useParams();
  const { event, isLoading, isError, error, refetchEvent } = useEvent(id);
  const navigate = useNavigate();
  const { refetchEvents } = useEvents();
  const { user } = useAuth();
  const {
    mutate: deleteEvent,
    isPending,
    isError: deleteIsError,
    error: deleteError,
  } = useDeleteEvent();

  const {
    mutate: unRegisterForEvent,
    isPending: pendingUnRegistration,
    isError: unRegistrationIsError,
    error: unRegistrationError,
  } = useUnRegisterForEvent();

  const {
    mutate: registerForEvent,
    isPending: pendingRegistration,
    isError: registrationIsError,
    error: registrationError,
  } = useRegisterForEvent();

  useEffect(() => {}, [event]);

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

  if (
    isError ||
    deleteIsError ||
    registrationIsError ||
    unRegistrationIsError
  ) {
    return (
      <Card className="w-full max-w-3xl mx-auto mt-8">
        <CardContent className="p-6">
          <div className="text-red-500">
            Error: {error?.message} {deleteError?.message}
            {registrationError?.message}
            {unRegistrationError?.message}
          </div>
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

  const isPastEvent = new Date(date) < new Date();
  const isUserRegistered = Registration?.some(
    (reg) => reg.userId === user?.data.id
  );

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent({ id });

      refetchEvents();
    }
  };

  const handleEventRegistration = async () => {
    if (!isUserRegistered) {
      const data = { userId: user?.data.id, eventId: event?.data.id };
      registerForEvent(data);

      refetchEvent({ eventId: event?.data.id });
      refetchEvents();
    } else {
      const data = { userId: user?.data.id, eventId: event?.data.id };

      unRegisterForEvent({ data });

      refetchEvent({ eventId: event?.data.id });
      refetchEvents();
    }
  };

  if (isPending) {
    return <div>Deleting Event...</div>;
  }

  const handleUpdate = () => {
    navigate(`/dashboard/update-event/${id}`);
  };

  function getRegisterButtonText() {
    if (!isUserRegistered) {
      return pendingRegistration ? 'Registering...' : 'Register for Event';
    } else if (isUserRegistered) {
      return pendingUnRegistration ? 'Unregistring...' : 'Unregister for Event';
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-col md:flex-row md:justify-between md:items-center p-3">
        <Button
          variant="ghost"
          className="self-start p-0 md:px-4 md:py-2 md:self-auto mb-2 md:mb-0"
          onClick={() => navigate(`/dashboard/events`)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex gap-2 justify-between">
          {user?.data.role === 'ADMIN' && (
            <Button variant="outline" onClick={handleUpdate}>
              <Pencil className="w-4 h-4 " />
              Edit
            </Button>
          )}
          {user?.data.role === 'ADMIN' && (
            <Button variant="destructive" onClick={handleDelete}>
              <Trash className="w-4 h-4 " />
              Delete
            </Button>
          )}
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

          {!isPastEvent && (
            <Button
              className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500"
              onClick={handleEventRegistration}
            >
              {getRegisterButtonText()}
            </Button>
          )}

          {isPastEvent && (
            <Button className="w-full md:w-auto bg-emerald-400 hover:bg-emerald-400 cursor-not-allowed">
              Event Closed
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Event;
