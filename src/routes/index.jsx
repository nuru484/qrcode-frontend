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
              path: '/dashboard/create-event',
              element: <CreateEventPage />,
            },
            {
              path: '/dashboard/update-event/:id',
              element: <UpdateEventPage />,
            },
            {
              path: '/dashboard/events',
              element: <Events />,
            },
            {
              path: '/dashboard/event/:id',
              element: <Event />,
            },
            {
              path: '/dashboard/registered-events',
              element: <UserEventRegistrations />,
            },
            {
              path: '/dashboard/scan-qr-code',
              element: <QRScanner />,
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
