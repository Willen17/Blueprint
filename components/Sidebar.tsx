import { Box } from '@mui/material';
import FrameSection from './sidebar/FrameSection';
import PosterSection from './sidebar/PosterSection';

const Sidebar = () => {
  return (
    <Box
      sx={{
        bgcolor: '#FBFBFB',
        height: 'calc(100vh - 50px)',
        maxHeight: 'calc(100vh - 50px)',
        overflowY: 'scroll',
        width: 280,
        minWidth: 280,
        borderLeft: '1px solid #F1F1F1',
      }}
    >
      <FrameSection />
      <PosterSection />
    </Box>
  );
};

export default Sidebar;
