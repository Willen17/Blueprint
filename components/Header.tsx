import { Container } from '@mui/system';

const Header = () => {
  return (
    <Container
      maxWidth={false}
      sx={{ height: 50, bgcolor: '#3A3335', color: '#fff' }}
    >
      This is header
    </Container>
  );
};

export default Header;
