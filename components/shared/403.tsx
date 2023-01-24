import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { theme } from '../theme';

const UnauthorisedAccess = () => {
  const XsScreen = useMediaQuery(theme.breakpoints.down(485));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      sx={{
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        columnGap: 2,
        flexWrap: 'wrap',
        height: !mobile ? 'calc(100vh - 100px)' : 'calc(100vh - 200px)',
      }}
    >
      <Typography
        fontSize={100}
        component="h1"
        fontFamily="Comfortaa"
        fontWeight={600}
        color="#3A3335"
      >
        403
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 0.5,
          placeItems: XsScreen ? 'center' : null,
        }}
      >
        <Typography variant="subtitle1">
          Unforunately you have no access to this page.
        </Typography>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="body1"
            color="#3086B7"
            sx={{ '&:hover': { color: '#000' } }}
          >
            Back to homepage
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default UnauthorisedAccess;
