import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useSidebar } from '../context/SidebarContext';
import SidebarToggleButton from './shared/SidebarToggleButton';
import AddFrameButton from './sidebar/AddFrameButton';
import BgSection from './sidebar/BgSection';
import FrameSection from './sidebar/FrameSection';
import MobileSidebar from './sidebar/MobileSidebar';
import PosterSection from './sidebar/PosterSection';
import RemoveFrameButton from './sidebar/RemoveFrameButton';
import { theme } from './theme';

const Sidebar = () => {
  const { anchorSidebar, setAnchorSidebar, setIsEditingFrame } = useSidebar();
  const { isEditingFrame } = useSidebar();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleClose = () => {
    setAnchorSidebar(false);
    if (isEditingFrame.item) setIsEditingFrame({ isEditing: false });
  };

  return (
    <>
      {/* Button when drawer is closed */}
      <SidebarToggleButton onClick={() => setAnchorSidebar(true)} />

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={anchorSidebar}
        onClose={toggleClose}
        sx={{
          mt: '50px',
          display: 'flex',
          flexDirection: 'row',
          '& .MuiDrawer-paper': {
            position: 'absolute',
            height: 'calc(100vh - 50px)',
            maxHeight: 'calc(100vh - 50px)',
            bgcolor: 'transparent',
            boxShadow: 0,
            overflowY: 'clip',
          },
        }}
      >
        <Box
          display="flex"
          sx={{ flexDirection: 'row', width: 295, minWidth: 295 }}
        >
          <Box
            bgcolor="transparent"
            width={16}
            minWidth={16}
            position="relative"
          >
            <SidebarToggleButton isToClose onClick={toggleClose} />
          </Box>
          <Box
            bgcolor="#FBFBFB"
            width={280}
            minWidth={280}
            position="relative"
            sx={{
              height: 'calc(100vh - 50px)',
              maxHeight: 'calc(100vh - 50px)',
              borderLeft: '1px solid #F1F1F1',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {isEditingFrame.isEditing ? (
              <>
                {mobile ? <MobileSidebar /> : null}
                <BgSection />
                <FrameSection />
                <PosterSection />
                {isEditingFrame.item ? <RemoveFrameButton /> : null}
              </>
            ) : (
              <AddFrameButton />
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
