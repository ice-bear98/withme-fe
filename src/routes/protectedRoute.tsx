import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/store';

const ProtectedRoute = () => {
  const { isLoggedIn } = useUserStore();

  if (!isLoggedIn) {
    alert('로그인이 필요할 페이지입니다.');
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
