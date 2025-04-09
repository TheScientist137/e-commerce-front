import { Navigate, Outlet } from 'react-router';
import { useAuthContext } from '../hooks/useContext';

export default function ProtectedRoute() {
 const { isAdmin } = useAuthContext();
 
 if (!isAdmin) {
  return <Navigate to='/' />
 }

 return <Outlet />
}
