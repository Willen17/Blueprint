import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { frameDimensions } from '../../data/frameData';
import dashedLineH from '../../public/homeImages/dashed-line-h.png';
import dashedLineV from '../../public/homeImages/dashed-line-v.png';
import banana from '../../public/homeImages/hero-image-banana.png';
import dog from '../../public/homeImages/hero-image-dog.png';
import pointer from '../../public/homeImages/hero-pointer.png';
import PlainFrame from '../shared/PlainFrame';
import SectionTitle from '../shared/SectionTitle';
import { theme } from '../theme';

const HomeHero = () => {
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: !tablet ? 'row' : 'column',
          justifyContent: 'space-between',
          pt: !tablet ? 10 : mobile ? 0 : 5,
          pb: !tablet ? 0 : 15,
          height: !tablet ? 500 : 'fit-content',
        }}
      >
        <Box mt={5} sx={{ position: !tablet ? 'absolute' : 'static' }}>
          <SectionTitle
            title="Unlock the designer within with blueprint"
            summary="Transform your walls in seconds with our frame visualization app. Preview before you buy for a perfect fit. Upgrade your decor now!"
            isH1
            withButton
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            position: !tablet ? 'absolute' : 'static',
            right: 0,
            placeSelf: !tablet ? 'unset' : 'flex-end',
            pt: !mobile ? 0 : 3,
            alignItems: 'end',
            gap: 3,
            pr: !mobile ? 10 : 3,
            zIndex: 999,
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
                  width: !mobile ? 180 : 120,
                  height: !mobile ? 180 : 120,
                  position: 'absolute',
                  bottom: !mobile ? -150 : -110,
                  right: !mobile ? -160 : -90,
                }}
              />
            </Box>
          </PlainFrame>
        </Box>
        {!mobile ? (
          <Image
            width={10}
            height={925}
            alt="dashed line vertical"
            src={dashedLineV}
            style={{ position: 'absolute', right: 30, top: -110 }}
          />
        ) : null}
      </Box>
      {!mobile ? (
        <Box
          width="100vw"
          height={10}
          sx={{
            position: 'absolute',
            top: 130,
            right: 0,
          }}
        >
          <Image
            width={925}
            height={10}
            alt="dashed line horizontal"
            src={dashedLineH}
            style={{ position: 'absolute', top: 0, right: 0 }}
          />
        </Box>
      ) : null}
    </>
  );
};

export default HomeHero;
