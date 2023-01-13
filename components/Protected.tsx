import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import Header from './Header';
import UnauthorisedAccess from './shared/403';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = (props: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const protectedRoutes = ['/admin/createBackground', '/admin/createPoster'];
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  if (!isAuthenticated && pathIsProtected)
    return (
      <>
        <Header />
        <UnauthorisedAccess />
      </>
    );
  return props.children;
};

export default ProtectedRoute;
