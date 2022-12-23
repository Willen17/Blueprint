import { Box, Drawer } from '@mui/material';
import { useState } from 'react';
import SidebarToggleButton from './shared/SidebarToggleButton';
import BgSection from './sidebar/BgSection';
import FrameSection from './sidebar/FrameSection';
import PosterSection from './sidebar/PosterSection';

const Sidebar = () => {
  const [anchor, setAnchor] = useState<boolean>(false);
  const toggleClose = () => setAnchor(false);

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
            }}
          >
            <BgSection />
            <FrameSection />
            <PosterSection />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
