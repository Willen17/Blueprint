import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import Home from '../pages';
import Header from './Header';
import HomeHeader from './home/HomeHeader';
import CustomSnackbar from './shared/CustomSnackbar';
import Loader from './shared/Loader';
import RotateDevice from './shared/RotateDevice';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const router = useRouter();
  const { isLoading } = useNotification();

  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    if (window.screen.orientation) {
      setIsPortrait(window.matchMedia('(orientation: portrait').matches);
      window
        .matchMedia('(orientation: portrait)')
        .addEventListener('change', (e) => {
          setIsPortrait(e.matches);
        });
    } else {
      setIsPortrait(Math.abs(window.orientation) !== 90);
      window.addEventListener('orientationchange', () => {
        setIsPortrait(Math.abs(window.orientation) !== 90);
      });
    }
    return () => {
      if (window.screen.orientation) {
        window
          .matchMedia('(orientation: portrait)')
          .removeEventListener('change', (e) => {
            setIsPortrait(e.matches);
          });
      } else {
        window.removeEventListener('orientationchange', () => {
          setIsPortrait(Math.abs(window.orientation) === 90);
        });
      }
    };
  }, []);

  useEffect(() => {
    console.log(isPortrait);
  }, [isPortrait]);

  return isLoading.isLoading ? (
    <Loader />
  ) : router.pathname === '/' ? (
    <Home />
  ) : (
    <>
      {router.pathname === '/404' ||
      (router.pathname === '/canvas' && isPortrait) ? (
        <HomeHeader noLoginButton />
      ) : (
        <Header />
      )}
      <Box
        component="main"
        display="flex"
        p={0}
        sx={{
          width: '100%',
          height: isPortrait ? 'calc(100vh - 100px)' : 'calc(100vh - 50px)',
          maxHeight: 'calc(100vh - 50px)',
        }}
      >
        {router.pathname === '/canvas' && isPortrait ? (
          <RotateDevice />
        ) : (
          props.children
        )}
        {router.pathname === '/canvas' && !isPortrait && <Sidebar />}
        <CustomSnackbar />
      </Box>
    </>
  );
};

export default Layout;
