import { Container } from '@mui/system';

const Sidebar = () => {
  return (
    <Container
      sx={{
        bgcolor: '#FBFBFB',
        height: 'calc(100vh - 50px)',
        width: 285,
      }}
    >
      This is sidebar
    </Container>
  );
};

export default Sidebar;
