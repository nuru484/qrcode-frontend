import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUpdateEvent } from '@/hooks/useEvent';
import EventForm from '@/components/event/EventForm';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { api } from '@/api';

const UpdateEventPage = () => {
  const { id } = useParams();
  const { mutate: updateEvent, isPending, isError, error } = useUpdateEvent();
  const [eventData, setEventData] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/event/${id}`);

        const { Attendance, Registration, ...rest } = response.data;

        setEventData(rest);
      } catch (err) {
        console.error('Failed to fetch event:', err);
      }
    };

    fetchEvent();
  }, [id]);

  const onSubmit = async (data) => {
    updateEvent(
      { id, data },
      {
        onSuccess: () => {
          setSuccess(true);
        },
      }
    );
  };

  const handleRedirect = () => {
    navigate(`/dashboard/event/${id}`);
  };

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto min-h-screen">
      <div>
        <EventForm
          onSubmit={onSubmit}
          isLoading={isPending}
          defaultValues={eventData}
          onCancel={() => {
            navigate(`/dashboard/event/${id}`);
          }}
        />
      </div>

      {isError && (
        <Alert className="border-red-600 mt-4 fixed top-2 text-black">
          <AlertDescription className="text-red-600">
            {error?.message}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <AlertDialog
          open={success}
          onOpenChange={() => {}}
          aria-live="assertive"
        >
          <AlertDialogContent>
            <AlertDialogTitle role="alert">
              Event Updated Successfully.
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your event update was successful! Click &quot;Okay&quot; to
              proceed to your dashboard.
            </AlertDialogDescription>
            <AlertDialogAction
              className="bg-emerald-600 hover:bg-emerald-500"
              onClick={handleRedirect}
              aria-label="Proceed to Dashboard"
            >
              Okay
            </AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default UpdateEventPage;
