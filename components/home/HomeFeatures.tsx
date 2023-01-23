import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import dashedLineH from '../../public/homeImages/dashed-line-h.png';
import dashedLineV from '../../public/homeImages/dashed-line-v.png';
import bgImage from '../../public/homeImages/home-bg.png';
import framesImage from '../../public/homeImages/home-frames.png';
import postersImage from '../../public/homeImages/home-posters.png';
import uploadBg from '../../public/homeImages/home-upload-bg.png';
import uploadImage from '../../public/homeImages/home-upload.png';
import SectionTitle from '../shared/SectionTitle';
import { theme } from '../theme';

const HomeFeatures = () => {
  const largeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {/* background feature */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          width: !tablet ? '50%' : mobile ? '100%' : '70%',
        }}
      >
        <SectionTitle
          title="Make your decor decisions easy with our wide range of backgrounds"
          summary="Design your space with ease using Blueprint's pre-set background feature. Choose from a wide range of backgrounds to preview your frames and make your decor decisions with precision."
        />
        <Image
          alt="image for background features"
          src={bgImage}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: !mobile ? 'unset' : 400,
            paddingLeft: !mobile ? 15 : 0,
            margin: !mobile ? 'unset' : 'auto',
          }}
        />
      </Box>

      {/* frame feature  */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          placeItems: !mobile ? 'end' : null,
          pt: !tablet ? 0 : mobile ? 6 : 5,
        }}
      >
        <SectionTitle
          title="Curious to see how different frames would look on your walls?"
          summary="Bring your decor vision to life with our frame customization feature. We provide a wide range of frames in various colors and styles to preview on your walls."
        />
        <Image
          alt="image for frame features"
          src={framesImage}
          style={{
            width: !mobile ? 400 : '90%',
            maxWidth: !mobile ? 'unset' : 350,
            height: '100%',
            paddingRight: !tablet ? 180 : mobile ? 0 : 120,
            margin: !mobile ? 'unset' : 'auto',
          }}
        />
      </Box>

      {/* poster feature */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          pt: !tablet ? 0 : mobile ? 6 : 5,
        }}
      >
        <SectionTitle
          title="Add a final touch to your wall with your favorite poster"
          summary="Select from our curated collection of popular posters, and visualize them on your wall in your chosen frame to achieve your ideal design."
        />
        <Image
          alt="image for poster features"
          src={postersImage}
          style={{
            width: !mobile ? 460 : '100%',
            maxWidth: !mobile ? 'unset' : 400,
            height: '100%',
            paddingLeft: !mobile ? 30 : 0,
            margin: !mobile ? 'unset' : 'auto',
          }}
        />
      </Box>

      {/* upload feature */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          placeItems: !mobile ? 'end' : null,
          pt: largeScreen ? 0 : tablet ? 11 : mobile ? 12 : 3,
        }}
      >
        <Image
          alt="background image for upload feature"
          src={uploadBg}
          style={{
            width: !tablet ? '50vw' : mobile ? '100%' : '80%',
            height: !tablet ? 500 : mobile ? 330 : 380,
            position: 'absolute',
            marginTop: !tablet ? -120 : mobile ? -50 : -60,
            right: 0,
            zIndex: -99,
          }}
        />
        <SectionTitle
          title="Unable to find your perfect design?"
          summary="Customize your design to perfection by uploading your own photos of your walls and posters with Blueprint's upload feature."
        />
        <Image
          alt="image for upload features"
          src={uploadImage}
          style={{
            width: 180,
            height: '100%',
            paddingRight: !mobile ? 220 : 0,
            margin: !mobile ? 'unset' : 'auto',
          }}
        />
      </Box>

      {/* get started */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          width: !tablet ? '50vw' : '100%',
          minHeight: !tablet ? 220 : mobile ? 80 : 100,
          mt: !tablet ? -10 : mobile ? 15 : 18,
          position: 'relative',
        }}
      >
        <SectionTitle
          withButton
          sx={{ placeItems: 'center', width: '100%' }}
          title="Simple, right? Let's try your own!"
        />
        {!mobile ? (
          <>
            <Image
              width={10}
              height={925}
              alt="dashed line vertical"
              src={dashedLineV}
              style={{
                position: 'absolute',
                bottom: -405,
                left: !tablet ? 0 : 24,
              }}
            />
            <Image
              width={925}
              height={10}
              alt="dashed line horizontal"
              src={dashedLineH}
              style={{ position: 'absolute', bottom: -10, left: -500 }}
            />
          </>
        ) : null}
      </Box>
    </>
  );
};

export default HomeFeatures;
