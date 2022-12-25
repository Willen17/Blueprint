import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { theme } from '../theme';

interface Props {
  children: ReactNode;
}

const MobileSidebarContainer = (props: Props) => {
  return (
    <Box
      bgcolor={theme.palette.primary.contrastText}
      px={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 280,
        minHeight: 'calc(100vh - 90px)',
        maxHeight: 'calc(100vh - 90px)',
        overflowY: 'scroll',
      }}
    >
      {props.children}
    </Box>
  );
};

export default MobileSidebarContainer;
