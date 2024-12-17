import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user } = useAuth(); // Obtén el usuario y su rol desde el contexto o estado global

  if (user?.categoria !== roleRequired) {
    // Redirige si el rol del usuario no coincide con el requerido
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;