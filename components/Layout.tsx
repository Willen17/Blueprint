import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { useNotification } from '../context/NotificationContext';
import Header from './Header';
import CustomSnackbar from './shared/CustomSnackbar';
import Loader from './shared/Loader';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const router = useRouter();
  const { isLoading } = useNotification();
  return (
    <>
      <Header />
      <Box
        display="flex"
        height="calc(100vh - 50px)"
        width="100%"
        p={0}
        sx={{ flexDirection: 'row' }}
      >
        {isLoading.isLoading ? (
          <Loader />
        ) : (
          <>
            <main
              style={{
                width: '100%',
                height: 'calc(100vh - 50px)',
                maxHeight: 'calc(100vh - 50px)',
              }}
            >
              {props.children}
            </main>
            {router.pathname.includes('admin') ||
            router.pathname === '/404' ? null : (
              <Sidebar />
            )}
          </>
        )}
      </Box>
      <CustomSnackbar />
    </>
  );
};

export default Layout;
