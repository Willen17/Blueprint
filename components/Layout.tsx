import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useNotification } from '../context/NotificationContext';
import Home from '../pages';
import Header from './Header';
import HomeHeader from './home/HomeHeader';
import CustomSnackbar from './shared/CustomSnackbar';
import Loader from './shared/Loader';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const router = useRouter();
  const { isLoading } = useNotification();

  return isLoading.isLoading ? (
    <Loader />
  ) : router.pathname === '/' ? (
    <Home />
  ) : (
    <>
      {router.pathname === '/404' ? <HomeHeader noLoginButton /> : <Header />}
      <Box
        component="main"
        display="flex"
        p={0}
        sx={{
          width: '100%',
          height: 'calc(100vh - 50px)',
          maxHeight: 'calc(100vh - 50px)',
        }}
      >
        {props.children}
        {router.pathname.includes('admin') ||
        router.pathname === '/404' ? null : (
          <Sidebar />
        )}
        <CustomSnackbar />
      </Box>
    </>
  );
};

export default Layout;
