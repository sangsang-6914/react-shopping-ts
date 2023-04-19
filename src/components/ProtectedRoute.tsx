import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContextProvider';

function ProtectedRoute({ requiredAdmin, children }: any) {
  const { user } = useAuth();

  if (!user || (requiredAdmin && !user.isAdmin)) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default ProtectedRoute;
