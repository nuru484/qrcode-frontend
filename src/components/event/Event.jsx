import { useEvent, useEvents, useDeleteEvent } from '@/hooks/useEvent';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Calendar,
  MapPin,
  Tag,
  Users,
  ClipboardList,
  ArrowLeft,
  Pencil,
  Trash,
  CheckCircle,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  useRegisterForEvent,
  useUnRegisterForEvent,
} from '@/hooks/useEventRegistration';
import { useEventRegistrationContext } from '@/hooks/useEventRegistration';

const Event = () => {
  const { id } = useParams();
  const { event, isLoading, isError, error, refetchEvent } = useEvent(id);
  const { refetchEvents } = useEvents();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showUnregisterAlert, setShowUnregisterAlert] = useState(false);
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

  const [qrCode, setQrCode] = useState(null);
  const [showQRDialog, setShowQRDialog] = useState(false);

  const { setRegistrationCodes } = useEventRegistrationContext();

  useEffect(() => {
    if (qrCode) {
      setShowQRDialog(true);
    }
  }, [qrCode, event]);

  useEffect(() => {
    let timer;
    if (showUnregisterAlert) {
      timer = setTimeout(() => {
        setShowUnregisterAlert(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showUnregisterAlert, event]);

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
            {error?.message} {deleteError?.message}
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
      navigate('/dashboard/events');
    }
  };

  const handleEventRegistration = async () => {
    if (!isUserRegistered) {
      const data = { userId: user?.data.id, eventId: event?.data.id };
      registerForEvent(data, {
        onSuccess: (response) => {
          setRegistrationCodes((prev) => {
            const updatedCodes = [
              ...(prev || []),
              { data: response.data, eventId: response.eventId },
            ];
            setQrCode(response.data);
            return updatedCodes;
          });
          refetchEvent();
          refetchEvents();
        },
      });
    } else {
      const data = { userId: user?.data.id, eventId: event?.data.id };
      unRegisterForEvent(
        { data },
        {
          onSuccess: () => {
            setShowUnregisterAlert(true);
            refetchEvent();
            refetchEvents();
          },
        }
      );
    }
  };

  if (isPending) {
    return <div>Deleting Event...</div>;
  }

  function getRegisterButtonText() {
    if (!isUserRegistered) {
      return pendingRegistration ? 'Registering...' : 'Register for Event';
    } else if (isUserRegistered) {
      return pendingUnRegistration ? 'Unregistring...' : 'Unregister for Event';
    }
  }

  return (
    <>
      {showUnregisterAlert && (
        <Alert className="w-auto max-w-lg fixed top-4 left-1/2  bg-emerald-50 border-emerald-200 text-emerald-800 animate-in fade-in slide-in-from-top-2">
          <CheckCircle className="h-4 w-4 text-emerald-600" />
          <AlertDescription className="ml-2">
            Successfully unregistered
          </AlertDescription>
        </Alert>
      )}

      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Registration Successful</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center space-y-4 p-6">
            <div className="border-4 border-gray-200 rounded-lg p-2">
              <img
                src={qrCode}
                alt="QR Code"
                className="w-64 h-64 object-contain"
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              You can find this code in your registrations
            </p>
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              type="button"
              variant="default"
              onClick={() => setShowQRDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              <Button
                variant="outline"
                onClick={() => {
                  navigate(`/dashboard/update-event/${id}`);
                }}
              >
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
                className={`w-full md:w-auto ${
                  isUserRegistered
                    ? 'bg-red-600 hover:bg-red-500'
                    : 'bg-emerald-600 hover:bg-emerald-500'
                }`}
                onClick={handleEventRegistration}
              >
                {getRegisterButtonText()}
              </Button>
            )}

            {isPastEvent && (
              <Button
                variant="destructive"
                className="w-full md:w-auto cursor-not-allowed"
              >
                Event Closed
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Event;
