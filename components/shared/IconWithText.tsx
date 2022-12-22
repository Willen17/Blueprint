import { Box, Typography } from '@mui/material';
import { TablerIcon } from '@tabler/icons';
import { MouseEventHandler } from 'react';
import { theme } from '../theme';

interface Props {
  text: string;
  icon: TablerIcon;
  color?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const IconWithText = (props: Props) => {
  return (
    <Box
      sx={{
        color: props.color ? props.color : theme.palette.primary.contrastText,
        display: 'flex',
        flexDirection: 'row',
        placeItems: 'center',
        columnGap: 0.5,
        p: 0.5,
        cursor: 'pointer',
      }}
      onClick={props.onClick}
    >
      <props.icon width={15} stroke={1.5} style={{ cursor: 'pointer' }} />
      <Typography variant="body1">{props.text}</Typography>
    </Box>
  );
};

export default IconWithText;
