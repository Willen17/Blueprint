import { Box, Drawer, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useCanvas } from '../context/CanvasContext';
import SidebarToggleButton from './shared/SidebarToggleButton';
import AddFrameButton from './sidebar/AddFrameButton';
import BgSection from './sidebar/BgSection';
import FrameSection from './sidebar/FrameSection';
import MobileSidebar from './sidebar/MobileSidebar';
import PosterSection from './sidebar/PosterSection';
import { theme } from './theme';

const Sidebar = () => {
  const [anchor, setAnchor] = useState<boolean>(true);
  const toggleClose = () => setAnchor(false);
  const { isEditingFrame, setOpenMobileSection } = useCanvas();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {/* Button when drawer is closed */}
      <Box bgcolor="#FBFBFB" width={5} sx={{ borderLeft: '1px solid #F8F8F8' }}>
        <SidebarToggleButton onClick={() => setAnchor(true)} />
      </Box>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={anchor}
        onClose={toggleClose}
        hideBackdrop
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
          minWidth={295}
          width={295}
          sx={{ flexDirection: 'row' }}
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
            {isEditingFrame ? (
              <>
                {mobile ? <MobileSidebar /> : null}
                <BgSection />
                <FrameSection />
                <PosterSection />
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
