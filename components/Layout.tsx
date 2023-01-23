import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { useNotification } from '../context/NotificationContext';
import { useSave } from '../context/SaveContext';
import Home from '../pages';
import SaveModal from './canvas/SaveModal';
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
  const { openSaveModal } = useSave();

  const [isPortrait, setIsPortrait] = useState(false);
  const [mobile, setIsMobile] = useState<boolean>();

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
    if (navigator) {
      setIsMobile(() =>
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      );
    }
  }, []);

  return isLoading.isLoading ? (
    <Loader />
  ) : router.pathname === '/' ? (
    <Home />
  ) : (
    <>
      {router.pathname === '/404' ||
      (router.pathname === '/canvas' && isPortrait && mobile) ? (
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
          height:
            isPortrait && mobile ? 'calc(100vh - 200px)' : 'calc(100vh - 50px)',
        }}
      >
        {openSaveModal && <SaveModal />}
        {router.pathname === '/canvas' && isPortrait && mobile ? (
          <RotateDevice />
        ) : (
          props.children
        )}
        {router.pathname === '/canvas' && (!isPortrait || !mobile) && (
          <Sidebar />
        )}
        <CustomSnackbar />
      </Box>
    </>
  );
};

export default Layout;
