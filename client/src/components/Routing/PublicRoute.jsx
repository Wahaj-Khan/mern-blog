import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ element }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  return !currentUser ? element : <Navigate to="/" replace />;
};

export default PublicRoute;
