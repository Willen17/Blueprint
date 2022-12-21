import { Box } from '@mui/material';
import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

const Layout = (props: Props) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          padding: 0,
        }}
      >
        <main style={{ width: '100%' }}>{props.children}</main>
        <Sidebar />
      </Box>
    </>
  );
};

export default Layout;
