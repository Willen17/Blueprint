import { Container } from '@mui/system';
import FrameSection from './sidebar/FrameSection';

const Sidebar = () => {
  return (
    <Container
      sx={{
        bgcolor: '#FBFBFB',
        height: 'calc(100vh - 50px)',
        width: 285,
      }}
    >
      <FrameSection />
    </Container>
  );
};

export default Sidebar;
