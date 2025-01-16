import { useEvents, useDeleteEvent } from '@/hooks/useEvent';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Pencil,
  Trash2,
  Info,
  UserPlus,
  UserMinus,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';
import {
  useRegisterForEvent,
  useUnRegisterForEvent,
  useEventRegistrationContext,
} from '@/hooks/useEventRegistration';

const Events = () => {
  const { events, isLoading, isError, error, refetchEvents } = useEvents();
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { setRegistrationCodes } = useEventRegistrationContext();

  const [showUnregisterAlert, setShowUnregisterAlert] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [pendingRegistrations, setPendingRegistrations] = useState({});

  const {
    mutate: deleteEvent,
    isPending: isDeletePending,
    isError: deleteIsError,
    error: deleteError,
  } = useDeleteEvent();

  const {
    mutate: unRegisterForEvent,
    isError: unRegistrationIsError,
    error: unRegistrationError,
  } = useUnRegisterForEvent();

  const {
    mutate: registerForEvent,
    isError: registrationIsError,
    error: registrationError,
  } = useRegisterForEvent();

  useEffect(() => {
    if (qrCode) {
      setShowQRDialog(true);
    }
  }, [qrCode]);

  useEffect(() => {
    let timer;
    if (showUnregisterAlert) {
      timer = setTimeout(() => {
        setShowUnregisterAlert(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showUnregisterAlert]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(
        { id },
        {
          onSuccess: () => {
            navigate('/dashboard');
          },
        }
      );
      refetchEvents();
    }
  };

  const handleRegistration = async (eventId) => {
    const data = { userId: user?.data.id, eventId };

    setPendingRegistrations((prev) => ({
      ...prev,
      [eventId]: true,
    }));

    registerForEvent(data, {
      onSuccess: (response) => {
        setPendingRegistrations((prev) => ({
          ...prev,
          [eventId]: false,
        }));

        setRegistrationCodes((prev) => {
          const updatedCodes = [
            ...(prev || []),
            { data: response.data, eventId: response.eventId },
          ];
          setQrCode(response.data);
          return updatedCodes;
        });

        refetchEvents();
        queryClient.invalidateQueries(['event', eventId]);
      },
    });
  };

  const handleUnRegistration = async (eventId) => {
    const data = { userId: user?.data.id, eventId };

    setPendingRegistrations((prev) => ({
      ...prev,
      [eventId]: true,
    }));

    unRegisterForEvent(
      { data },
      {
        onSuccess: () => {
          setPendingRegistrations((prev) => ({
            ...prev,
            [eventId]: false,
          }));
          setShowUnregisterAlert(true);
          refetchEvents();
          queryClient.invalidateQueries(['event', eventId]);
        },
      }
    );
  };

  if (isDeletePending) {
    return <div>Deleting Event...</div>;
  }

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="w-11/12 max-w-2xl mx-auto mt-8">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </>
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

  return (
    <>
      {showUnregisterAlert && (
        <Alert className="w-auto max-w-lg fixed top-4 left-1/2 transform -translate-x-1/2 bg-emerald-50 border-emerald-200 text-emerald-800 animate-in fade-in slide-in-from-top-2">
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

      <div className="space-y-4 w-full max-w-3xl mx-auto mt-10">
        <h1 className="text-3xl mt-8 font-bold">Events Available</h1>
        {events?.data.map((event) => (
          <Card
            key={event.id}
            className="transition-all duration-200 hover:shadow-md"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => navigate(`/dashboard/event/${event.id}`)}
                  title="View Details"
                >
                  <Info className="w-5 h-5 text-blue-600" />
                </button>
                {user?.data.role === 'ADMIN' && (
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => {
                      navigate(`/dashboard/update-event/${event.id}`);
                    }}
                    title="Edit Event"
                  >
                    <Pencil className="w-5 h-5 text-gray-600" />
                  </button>
                )}

                {user?.data.role === 'ADMIN' && (
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={() => handleDelete(event.id)}
                    title="Delete Event"
                  >
                    <Trash2 className="w-5 h-5 text-red-600" />
                  </button>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <CardDescription className="text-gray-600 line-clamp-2">
                {event.description}
              </CardDescription>

              <div className="mt-4 flex gap-2">
                <button
                  className={`flex items-center gap-2 px-4 py-2 text-white rounded-md transition-colors ${
                    new Date(event.date) > new Date()
                      ? event.Registration.some(
                          (reg) => reg.userId === user?.data.id
                        )
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-emerald-600 hover:bg-emerald-500'
                      : 'bg-emerald-400 hover:bg-emerald-400 cursor-not-allowed'
                  }`}
                  onClick={() =>
                    event.Registration.some(
                      (reg) => reg.userId === user?.data.id
                    )
                      ? handleUnRegistration(event.id)
                      : handleRegistration(event.id)
                  }
                  disabled={new Date(event.date) <= new Date()}
                >
                  {pendingRegistrations[event.id] ? (
                    <>
                      <UserMinus className="w-4 h-4" />
                      {event.Registration.some(
                        (reg) => reg.userId === user?.data.id
                      )
                        ? 'Unregistering...'
                        : 'Registering...'}
                    </>
                  ) : event.Registration.some(
                      (reg) => reg.userId === user?.data.id
                    ) ? (
                    <>
                      <UserMinus className="w-4 h-4" />
                      Unregister
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      Register for Event
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Events;
