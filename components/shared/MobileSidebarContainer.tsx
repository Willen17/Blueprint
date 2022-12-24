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
        maxWidth: 280,
        minHeight: 'calc(100vh - 90px)',
        maxHeight: 'calc(100vh - 90px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {props.children}
    </Box>
  );
};

export default MobileSidebarContainer;
