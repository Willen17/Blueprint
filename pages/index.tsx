import { Container } from '@mui/material';
import Head from 'next/head';
import HomeFeatures from '../components/home/HomeFeatures';
import HomeFooter from '../components/home/HomeFooter';
import HomeHeader from '../components/home/HomeHeader';
import HomeHero from '../components/home/HomeHero';

export default function Home() {
  return (
    <>
      <Head>
        <title>Blue print | Visualize your frames</title>
        <meta name="description" content="Visualize your frames" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', overflowX: 'clip' }}
      >
        <HomeHeader />
        <HomeHero />
        <HomeFeatures />
      </Container>
      <HomeFooter />
    </>
  );
}
