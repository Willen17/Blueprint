import { Box, Container } from '@mui/material';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import HomeHeader from '../components/home/HomeHeader';
import SectionTitle from '../components/home/SectionTitle';
import PlainFrame from '../components/shared/PlainFrame';
import { frameDimensions } from '../data/frameData';
import banana from '../public/homeImages/hero-image-banana.png';
import dog from '../public/homeImages/hero-image-dog.png';
import pointer from '../public/homeImages/hero-pointer.png';

const inter = Inter({ subsets: ['latin'] });

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
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        <HomeHeader />

        {/* hero */}
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            pt: 10,
            height: 500,
          }}
        >
          <Box mt={5} sx={{ position: 'absolute' }}>
            <SectionTitle
              title="Lorem Ipsum is simply dummy?"
              summary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
              isH1
              withButton
            />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'end',
              alignItems: 'end',
              gap: 3,
              pr: 10,
            }}
          >
            <PlainFrame size={frameDimensions.lg} bgColor="#3A3335" isLandscape>
              <Box
                sx={{
                  height: '70%',
                  width: '70%',
                  m: 'auto auto',
                  display: 'flex',
                  background: 'green',
                }}
              >
                <Image
                  alt="Hero Banana Image"
                  src={banana}
                  style={{
                    background: '#fff',
                    display: 'block',
                    padding: '1.5%',
                    width: '100%',
                    height: '100%',
                    boxShadow: 'inset 0px 0.1em 0.1em rgba(0, 0, 0, 0.2)',
                  }}
                />
              </Box>
            </PlainFrame>

            <PlainFrame size={frameDimensions.xl} bgColor="#3A3335">
              <Box
                sx={{
                  height: '70%',
                  width: '70%',
                  m: 'auto auto',
                  display: 'flex',
                  position: 'relative',
                }}
              >
                <Image
                  alt="Hero Dog Image"
                  src={dog}
                  style={{
                    background: '#fff',
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    padding: '1.5%',
                    boxShadow: 'inset 0px 0.1em 0.1em rgba(0, 0, 0, 0.2)',
                  }}
                />
                <Image
                  alt="Hero Pointer Image"
                  src={pointer}
                  style={{
                    width: 180,
                    height: 180,
                    position: 'absolute',
                    bottom: -150,
                    right: -160,
                  }}
                />
              </Box>
            </PlainFrame>
          </Box>
        </Box>

        {/* features */}
        <Box bgcolor="purple">hi</Box>
      </Container>
    </>
  );
}
