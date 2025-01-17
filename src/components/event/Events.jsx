import { useEvents, useDeleteEvent } from '@/hooks/useEvent';
import { useQueryClient } from '@tanstack/react-query';
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
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  Pencil,
  Trash2,
  Info,
  UserPlus,
  UserMinus,
  ArrowLeft,
  CheckCircle,
  FileText,
} from 'lucide-react';
import {
  useRegisterForEvent,
  useUnRegisterForEvent,
  useEventRegistrationContext,
} from '@/hooks/useEventRegistration';

const Events = () => {
  const { events, isLoading, isError, error, refetchEvents } = useEvents();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { setRegistrationCodes } = useEventRegistrationContext();
  const [showUnregisterAlert, setShowUnregisterAlert] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [showQRDialog, setShowQRDialog] = useState(false);
  const [pendingRegistrations, setPendingRegistrations] = useState({});
  const [pendingDeletion, setPendingDeletion] = useState({});

  const isReportsView = location.pathname === '/dashboard/view-reports';

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
      setPendingDeletion((prev) => ({
        ...prev,
        [id]: true,
      }));

      deleteEvent(
        { id },
        {
          onSuccess: () => {
            setPendingDeletion((prev) => ({
              ...prev,
              [id]: false,
            }));
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

  const handleViewReport = (eventId) => {
    navigate(`/dashboard/event/${eventId}/attendance-report`);
  };

  if (isLoading) {
    return (
      <div className="space-y-4 w-full max-w-3xl mx-auto mt-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="w-full">
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
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

  if (!events?.data?.length) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <p className="text-center text-gray-500">
            {isReportsView
              ? `There's  currently no event for report.`
              : `There's currently no event.`}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {showUnregisterAlert && (
        <Alert className="w-auto max-w-lg fixed top-4 z-30 left-1/2 transform -translate-x-1/2 bg-emerald-50 border-emerald-200 text-emerald-800 animate-in fade-in slide-in-from-top-2">
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
        <Card>
          <CardHeader>
            <CardTitle>
              {isReportsView ? 'Event Reports' : 'Available Events'}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {events?.data?.length > 0 &&
              events.data.map((event) => {
                const today = new Date();
                const eventDate = new Date(event.date);
                const isUpcoming = eventDate >= today;
                const isPast = eventDate < today;

                return (
                  <Card
                    key={event.id}
                    className="transition-all duration-200 hover:shadow-md"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-wrap md:flex-nowrap justify-between items-start mb-2">
                        <h3
                          className={`text-xl font-semibold   ${
                            !isReportsView && 'order-2'
                          } md:order-1`}
                        >
                          {event.title}
                        </h3>
                        <div
                          className={`flex items-center gap-2 ${
                            !isReportsView && 'order-1'
                          }  md:order-2`}
                        >
                          {!isReportsView && (
                            <button
                              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                              onClick={() =>
                                navigate(`/dashboard/event/${event.id}`)
                              }
                              title="View Details"
                            >
                              <Info className="w-5 h-5 text-blue-600" />
                            </button>
                          )}
                          {user?.data.role === 'ADMIN' && !isReportsView && (
                            <>
                              <button
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                onClick={() => {
                                  navigate(
                                    `/dashboard/update-event/${event.id}`
                                  );
                                }}
                                title="Edit Event"
                              >
                                <Pencil className="w-5 h-5 text-gray-600" />
                              </button>
                              <button
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                onClick={() => handleDelete(event.id)}
                                title="Delete Event"
                              >
                                <Trash2 className="w-5 h-5 text-red-600" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{event.description}</p>

                      <div className="flex items-center justify-center md:justify-normal gap-2">
                        {isReportsView ? (
                          <Button
                            className="flex items-center justify-start gap-2 bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleViewReport(event.id)}
                          >
                            <FileText className="w-4 h-4" />
                            Attendance Report
                          </Button>
                        ) : (
                          isUpcoming && (
                            <Button
                              className={`flex items-center gap-2 ${
                                event.Registration.some(
                                  (reg) => reg.userId === user?.data.id
                                )
                                  ? 'bg-red-600 hover:bg-red-700'
                                  : 'bg-emerald-600 hover:bg-emerald-700'
                              }`}
                              onClick={() =>
                                event.Registration.some(
                                  (reg) => reg.userId === user?.data.id
                                )
                                  ? handleUnRegistration(event.id)
                                  : handleRegistration(event.id)
                              }
                            >
                              {pendingRegistrations[event.id] ? (
                                'Processing...'
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
                            </Button>
                          )
                        )}
                        {!isReportsView && isPast && (
                          <Button
                            variant="destructive"
                            className="cursor-not-allowed"
                            disabled
                          >
                            Event Closed
                          </Button>
                        )}

                        {isDeletePending && pendingDeletion[event.id] && (
                          <div>Deleting event...</div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Events;
