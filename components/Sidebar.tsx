import { Box, Drawer, Typography, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useCanvas } from '../context/CanvasContext';
import SidebarToggleButton from './shared/SidebarToggleButton';
import AddFrameButton from './sidebar/AddFrameButton';
import BgSection from './sidebar/BgSection';
import FrameSection from './sidebar/FrameSection';
import PosterSection from './sidebar/PosterSection';
import { theme } from './theme';

const Sidebar = () => {
  const [anchor, setAnchor] = useState<boolean>(true);
  const toggleClose = () => setAnchor(false);
  const { isEditingFrame } = useCanvas();
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
            {mobile ? (
              <Box
                minHeight={40}
                maxHeight={40}
                bgcolor="#FBFBFB"
                borderBottom="#F1F1F1 1px solid"
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  placeItems: 'center',
                  placeContent: 'center',
                  gap: 3,
                }}
              >
                <Typography
                  variant="body1"
                  component="h2"
                  sx={{
                    cursor: 'pointer',
                    width: 65,
                    textAlign: 'center',
                    '&:hover': {
                      fontWeight: 600,
                    },
                  }}
                >
                  Background
                </Typography>
                <Typography
                  variant="body1"
                  component="h2"
                  sx={{
                    cursor: 'pointer',
                    width: 35,
                    textAlign: 'center',
                    '&:hover': {
                      fontWeight: 600,
                    },
                  }}
                >
                  Frame
                </Typography>
                <Typography
                  variant="body1"
                  component="h2"
                  sx={{
                    cursor: 'pointer',
                    width: 35,
                    textAlign: 'center',

                    '&:hover': {
                      fontWeight: 600,
                    },
                  }}
                >
                  Poster
                </Typography>
              </Box>
            ) : null}
            {isEditingFrame ? (
              <>
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
