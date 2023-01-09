import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { useSidebar } from '../../context/SidebarContext';
import { theme } from '../theme';

interface Props {
  children: ReactNode;
}

const MobileSidebarContainer = (props: Props) => {
  const { isEditingFrame } = useSidebar();

  return (
    <Box
      bgcolor={theme.palette.primary.contrastText}
      px={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 280,
        minHeight: isEditingFrame.item
          ? 'calc(100vh - 130px)'
          : 'calc(100vh - 90px)',
        maxHeight: isEditingFrame.item
          ? 'calc(100vh - 130px)'
          : 'calc(100vh - 90px)',
        overflowX: 'clip',
        overflowY: 'scroll',
        '&::-webkit-scrollbar': {
          width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(0,0,0,.1)',
          borderRadius: 5,
          outline: 'none',
        },
      }}
    >
      {props.children}
    </Box>
  );
};

export default MobileSidebarContainer;
