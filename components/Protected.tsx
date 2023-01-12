import { useRouter } from 'next/router';
import { useUser } from '../context/UserContext';
import UnauthorisedAccess from './shared/UnauthorisedAccess';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = (props: Props) => {
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const protectedRoutes = ['/admin/createBackground', '/admin/createPoster'];
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  if (!isAuthenticated && pathIsProtected) return <UnauthorisedAccess />;
  return props.children;
};

export default ProtectedRoute;
