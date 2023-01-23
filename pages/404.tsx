import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import { theme } from '../components/theme';

const Custom404 = () => {
  const XsScreen = useMediaQuery(theme.breakpoints.down(485));
  return (
    <>
      <Head>
        <title>404 Page Not Found | Blue print | Visualize your frames</title>
        <meta name="description" content="404 Page Not Found" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        sx={{
          display: 'flex',
          placeContent: 'center',
          placeItems: 'center',
          columnGap: 2,
          flexWrap: 'wrap',
          height: '100%',
        }}
      >
        <Typography
          fontSize={100}
          component="h1"
          fontFamily="Comfortaa"
          fontWeight={600}
          color="#3A3335"
        >
          404
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
            Oops, this page does not exist.
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
    </>
  );
};

export default Custom404;
