import { Box } from '@mui/material';
import Image from 'next/image';
import { frameDimensions } from '../../data/frameData';
import dashedLineH from '../../public/homeImages/dashed-line-h.png';
import dashedLineV from '../../public/homeImages/dashed-line-v.png';
import banana from '../../public/homeImages/hero-image-banana.png';
import dog from '../../public/homeImages/hero-image-dog.png';
import pointer from '../../public/homeImages/hero-pointer.png';
import PlainFrame from '../shared/PlainFrame';
import SectionTitle from '../shared/SectionTitle';

const HomeHero = () => {
  return (
    <>
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
        <Image
          width={10}
          height={925}
          alt="dashed line vertical"
          src={dashedLineV}
          style={{ position: 'absolute', right: 30, top: -110 }}
        />
      </Box>
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
    </>
  );
};

export default HomeHero;
