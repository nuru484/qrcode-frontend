import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUserEventRegistrations } from '@/hooks/useEventRegistration';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChevronRight } from 'lucide-react';

const UserEventRegistrations = () => {
  const { user } = useAuth();
  const { userEventRegistrations } = useUserEventRegistrations(user?.data.id);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mt-12 mb-3">
        List of your Registered Events
      </h1>
      {userEventRegistrations?.data.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
          {userEventRegistrations.data.map((registration, index) => (
            <div
              key={registration.id || index}
              onClick={() => handleEventClick(registration)}
              className="flex items-center justify-between  py-4 px-2 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex items-center">
                <img
                  src={registration.registrationCode}
                  alt="QR Code"
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {registration.event.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {new Date(registration.event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600" />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 my-4">
          You have not registered for any events yet.
        </p>
      )}

      <Dialog open={!!selectedEvent} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.event.title}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center p-4">
            <img
              src={selectedEvent?.registrationCode}
              alt="QR Code"
              className="w-64 h-64 object-contain"
            />
            <p className="mt-4 text-sm text-gray-500">
              Event Date:{' '}
              {new Date(selectedEvent?.event.date).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              Location: {selectedEvent?.event.location}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserEventRegistrations;
