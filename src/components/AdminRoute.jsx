import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminRoute = ({ children }) => {
  const { currentUser } = useSelector(state => state.currentUser);
  const token = Cookies.get('token');

  // If no token, redirect to signin
  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  // If user data is loading, show loading or wait
  if (!currentUser) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
    </div>;
  }

  // If user is not admin, redirect to home
  if (currentUser.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // If user is admin, render the protected component
  return children;
};

export default AdminRoute;
