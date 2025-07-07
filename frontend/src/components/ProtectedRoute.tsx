import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  requiredRoles?: string[];
}

const ProtectedRoute = ({ requiredRoles }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiredRoles && !requiredRoles.includes(user.role)) {
    // Optionally, navigate to an unauthorized page or display a message
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;