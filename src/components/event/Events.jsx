import { useEvents } from '@/hooks/useEvent';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Pencil, Trash2, Info, UserPlus, UserMinus } from 'lucide-react';

const Events = () => {
  const { events, isLoading, isError, error } = useEvents();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  if (isError) {
    return (
      <Card className="w-11/12 max-w-2xl mx-auto mt-8 border-red-600">
        <div className="flex items-center justify-center flex-wrap">
          <CardContent className="p-6">
            <p className="text-red-500 font-medium">
              Error: {error?.message || 'An unknown error occurred'}
            </p>
          </CardContent>
          <Button
            className="bg-emerald-600 m-4 hover:bg-emerald-500"
            onClick={() => navigate('/')}
          >
            Home
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-3xl mx-auto">
      {events.data.map((event) => (
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
                  onClick={() =>
                    navigate(`/dashboard/update-event/${event.id}`)
                  }
                  title="Edit Event"
                >
                  <Pencil className="w-5 h-5 text-gray-600" />
                </button>
              )}

              {user?.data.role === 'ADMIN' && (
                <button
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={() => console.log('Delete clicked:', event.title)}
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

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              {event.date && (
                <span>{new Date(event.date).toLocaleDateString()}</span>
              )}
              {event.location && (
                <span className="flex items-center">• {event.location}</span>
              )}
            </div>

            <div className="mt-4 flex gap-2">
              {!event.isRegistered ? (
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition-colors"
                  onClick={() => console.log('Register clicked:', event.title)}
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </button>
              ) : (
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                  onClick={() =>
                    console.log('Unregister clicked:', event.title)
                  }
                >
                  <UserMinus className="w-4 h-4" />
                  Unregister
                </button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Events;
