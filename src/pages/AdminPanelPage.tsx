import { useAuthContext } from '../hooks/useContext';

export default function AdminPanel() {
 const { isAdmin } = useAuthContext();

 if (!isAdmin) {
  return <div>You do not have rights to access this page</div>
 }
 return (
  <div>
   admin panel
  </div>
 )
}