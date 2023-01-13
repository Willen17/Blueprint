import { useRouter } from 'next/router';
import { useNotification } from '../context/NotificationContext';
import { useUser } from '../context/UserContext';
import Header from './Header';
import UnauthorisedAccess from './shared/403';
import Loader from './shared/Loader';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = (props: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const { isLoading } = useNotification();
  const protectedRoutes = ['/admin/createBackground', '/admin/createPoster'];
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;
  if (!isAuthenticated && pathIsProtected)
    return (
      <>
        <Header />
        {isLoading ? <Loader /> : <UnauthorisedAccess />}
      </>
    );
  return props.children;
};

export default ProtectedRoute;
