import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '../context/UserContext';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = (props: Props) => {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  const protectedRoutes = ['/admin/createBackground', '/admin/createPoster'];
  const pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

  useEffect(() => {
    console.log('IsAuthenticated: ', isAuthenticated);
    console.log('PathIsProtected: ', pathIsProtected);
    if (!isAuthenticated && pathIsProtected) router.push('/');
  }, [isAuthenticated, pathIsProtected, router]);

  return props.children;
};

export default ProtectedRoute;
