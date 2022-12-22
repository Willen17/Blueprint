import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  subtitle: string;
  children?: ReactNode;
}

const SidebarSubtitle = (props: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        placeItems: 'center',
        py: 2,
      }}
    >
      <Typography variant="subtitle1">{props.subtitle}</Typography>
      {props.children}
    </Box>
  );
};

export default SidebarSubtitle;
