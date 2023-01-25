import { Box, Typography } from '@mui/material';
import { IconPlus } from '@tabler/icons';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { sidebarSections } from '../../lib/valSchemas';
import { theme } from '../theme';

const AddFrameButton = () => {
  const { setIsEditingFrame, setExpandedAccordion, setOpenMobileSection } =
    useSidebar();
  const { getBackground } = useCanvas();

  /* Handle click of the "Add Frame" button */
  const handleClick = () => {
    if (
      getBackground() &&
      getBackground()?.image !==
        'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Fnobg.jpg?alt=media&token=1f87fbca-5ba8-4720-b6a4-32e8c3ca6d8b'
    ) {
      setExpandedAccordion(sidebarSections[1]);
      setOpenMobileSection(sidebarSections[1]);
    } else {
      setExpandedAccordion(sidebarSections[0]);
      setOpenMobileSection(sidebarSections[0]);
    }
    setIsEditingFrame({ isEditing: true });
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
