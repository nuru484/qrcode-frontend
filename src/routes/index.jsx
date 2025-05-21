//src/routes/index.jsx
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ErrorPage from '@/pages/ErrorPage';
import Layout from '@/pages/Dashboard';
import Events from '@/components/event/Events';
import Event from '@/components/event/Event';
import CreateEventPage from '@/pages/CreateEventPage';
import UpdateEventPage from '@/pages/UpdateEventPage';
import UserEventRegistrations from '@/components/eventRegistration/UserEventRegistrations';
import QRScanner from '@/components/attendance/ScanQrCode';
import UserAttendedEvents from '@/components/attendance/UserAttendedEvents';
import EventAttendanceReports from '@/components/attendance/EventAttendanceReports';

// Importing the necessary components for routing
const Routes = () => {
  // Routes accessible only to authenticated users
  const protectedRoutes = [
    {
      path: '/',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/dashboard',
          element: <Layout />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: '/dashboard/events/create-event',
              element: <CreateEventPage />,
            },
            {
              path: '/dashboard/events/update-event/:id',
              element: <UpdateEventPage />,
            },
            {
              path: '/dashboard/events',
              element: <Events />,
            },
            {
              path: '/dashboard/events/event/:id',
              element: <Event />,
            },
            {
              path: '/dashboard/registration/registered-events',
              element: <UserEventRegistrations />,
            },
            {
              path: '/dashboard/registration/scan-qr-code',
              element: <QRScanner />,
            },

            {
              path: '/dashboard/attendance/attended-events',
              element: <UserAttendedEvents />,
            },
            {
              path: '/dashboard/attendance/view-reports',
              element: <Events />,
            },
            {
              path: '/dashboard/attendance/event/:eventId/attendance-report',
              element: <EventAttendanceReports />,
            },
          ],
        },
      ],
    },
  ];

  // Routes accessible only to non-authenticated users
  const publicRoutes = [
    {
      path: '/',
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },

    {
      path: '/login',
      element: <LoginPage />,
    },

    {
      path: '/signup',
      element: <SignupPage />,
    },
  ];

  const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

  return <RouterProvider router={router} />;
};

export default Routes;
