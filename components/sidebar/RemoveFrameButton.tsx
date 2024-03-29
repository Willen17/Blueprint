import { Box, Typography } from '@mui/material';
import { IconTrash } from '@tabler/icons';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { theme } from '../theme';

const RemoveFrameButton = () => {
  const { deleteItem } = useCanvas();
  const { isEditingFrame } = useSidebar();

  return (
    <Box
      bgcolor="#E23A22"
      color={theme.palette.primary.contrastText}
      sx={{
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        gap: 0.5,
        cursor: 'pointer',
        '&:hover': {
          bgcolor: '#D13838',
        },
      }}
      height={40}
      onClick={() => deleteItem(isEditingFrame.item!)}
    >
      <IconTrash size={16} stroke={2} />
      <Typography variant="body1">Delete Frame</Typography>
    </Box>
  );
};

export default RemoveFrameButton;
