import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ element }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  return currentUser ? element : <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
