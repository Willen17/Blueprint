import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  const router = useRouter();
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
        <main
          style={{
            width: '100%',
            height: 'calc(100vh - 50px)',
            maxHeight: 'calc(100vh - 50px)',
          }}
        >
          {props.children}
        </main>
        {!router.pathname.includes('admin') && <Sidebar />}
      </Box>
    </>
  );
};

export default Layout;
