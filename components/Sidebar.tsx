import { Box, Drawer } from '@mui/material';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons';
import { useState } from 'react';
import BgSection from './sidebar/BgSection';
import FrameSection from './sidebar/FrameSection';
import PosterSection from './sidebar/PosterSection';

const Sidebar = () => {
  const [anchor, setAnchor] = useState<boolean>(false);
  const toggleClose = () => setAnchor(false);

  return (
    <>
      <Box
        sx={{ bgcolor: '#FBFBFB', width: 5, borderLeft: '1px solid #F8F8F8' }}
      >
        <Box
          onClick={() => setAnchor(true)}
          sx={{
            position: 'absolute',
            width: 15,
            height: 110,
            right: 6,
            top: '50%',
            zIndex: 999,
            bgcolor: '#F8F8F8',
            mt: '25px',
            border: '1px solid #F8F8F8',
            borderRadius: '10px 0 0 10px',
            transform: 'translateY(-50%)',
            display: 'flex',
            placeItems: 'center',
          }}
        >
          <IconChevronLeft color="#898989" />
        </Box>
      </Box>

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
          sx={{
            width: 295,
            minWidth: 295,
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Box
            sx={{
              bgcolor: 'transparent',
              width: 16,
              minWidth: 16,
              position: 'relative',
            }}
          >
            <Box
              onClick={toggleClose}
              sx={{
                position: 'absolute',
                width: 15,
                height: 110,
                left: 0,
                top: '50%',
                zIndex: 999,
                bgcolor: '#F8F8F8',
                border: '1px solid #F8F8F8',
                borderRadius: '10px 0 0 10px',
                transform: 'translateY(-50%)',
                display: 'flex',
                placeItems: 'center',
              }}
            >
              <IconChevronRight color="#898989" />
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: '#FBFBFB',
              height: 'calc(100vh - 50px)',
              maxHeight: 'calc(100vh - 50px)',
              width: 280,
              minWidth: 280,
              borderLeft: '1px solid #F1F1F1',
              position: 'relative',
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
