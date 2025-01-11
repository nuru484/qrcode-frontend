import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

const ProtectedRoutes = () => {
  const { user, isLoading, isError, error } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error('Authentication Error:', error);
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
