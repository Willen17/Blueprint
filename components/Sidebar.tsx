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
  const { anchorSidebar, setAnchorSidebar, isEditingFrame, endEditMode } =
    useSidebar();

  const mobile = useMediaQuery(theme.breakpoints.down(800));
  const toggleClose = () => {
    setAnchorSidebar(false);
    endEditMode();
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
          display: 'flex',
          flexDirection: 'row',
          '& .MuiDrawer-paper': {
            position: 'absolute',
            right: 0,
            top: 50,
            bgcolor: 'transparent',
            boxShadow: 0,
            overflowX: 'clip',
            // the below scrollbar is not supposed to be seen on desktop
            // it's here only because the user couldnt scroll to the delete button on iphone
            // other phone models not tested
            overflowY: isEditingFrame && mobile ? 'scroll' : 'clip',
            '&::-webkit-scrollbar': {
              width: 0,
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'none',
              webkitBoxShadow: 'none',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'transparent',
              outline: 'none',
            },
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
              height: mobile ? '100vh' : 'calc(100vh - 50px)',
              maxHeight: mobile ? '100vh' : 'calc(100vh - 50px)',
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
