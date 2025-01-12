import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProtectedRoutes from './ProtectedRoutes';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import StudentDashboard from '@/pages/StudentDashboard';
import ErrorPage from '@/pages/ErrorPage';

import Event from '@/components/event/Event';

const Routes = () => {
  // Routes accessible only to authenticated users
  const protectedRoutes = [
    {
      path: '/',
      element: <ProtectedRoutes />,
      children: [
        {
          path: '/dashboard/STUDENT',
          element: <StudentDashboard />,
        },
      ],
    },
  ];

  // Routes accessible only to non-authenticated users
  const publicRoutes = [
    {
      path: '/',
      element: <Event />,
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

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

  return <RouterProvider router={router} />;
};

export default Routes;
