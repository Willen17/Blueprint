import { Box, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons';
import { useCanvas } from '../../context/CanvasContext';
import { theme } from '../theme';

const AddFrameButton = () => {
  const { setIsEditingFrame } = useCanvas();
  return (
    <Box
      bgcolor="#3A3335"
      color={theme.palette.primary.contrastText}
      sx={{
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        gap: 0.5,
        cursor: 'pointer',
        '&:hover': {
          bgcolor: '#524C4E',
        },
      }}
      height={40}
      onClick={() => setIsEditingFrame(true)} // TODO: add function
    >
      <IconPlus size={16} stroke={2} />
      <Typography variant="body1">Add Frame</Typography>
    </Box>
  );
};

export default AddFrameButton;
