import { Box, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { sidebarSections } from '../../lib/valSchemas';
import { theme } from '../theme';

const AddFrameButton = () => {
  const { setIsEditingFrame, setExpandedAccordion } = useSidebar();
  const { background } = useCanvas();

  const handleClick = () => {
    if (background) {
      setIsEditingFrame(true);
      setExpandedAccordion(sidebarSections[1]);
    }
    setIsEditingFrame(true);
  };
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
      onClick={handleClick}
    >
      <IconPlus size={16} stroke={2} />
      <Typography variant="body1">Add Frame</Typography>
    </Box>
  );
};

export default AddFrameButton;
