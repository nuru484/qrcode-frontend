import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import ErrorPage from '@/pages/ErrorPage';
import Layout from '@/pages/Dashboard';
import Events from '@/components/event/Events';
import Event from '@/components/event/Event';
import CreateEventPage from '@/pages/CreateEventPage';

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
              path: '/dashboard/events',
              element: <Events />,
            },
            {
              path: '/dashboard/events/:id',
              element: <Event />,
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
      element: <CreateEventPage />,
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
