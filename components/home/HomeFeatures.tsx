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
          title="Lorem Ipsum is simply background"
          summary="We know everyone has their own decor home style so we provide a wide variety of backgrounds for our users to choose from."
        />
        <Image
          alt="images for background features"
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
          title="Wonder how your wall looks like with different frames? "
          summary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        />
        <Image
          alt="images for background features"
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
          title="Add your favourite posters xyz"
          summary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        />
        <Image
          alt="images for background features"
          src={postersImage}
          style={{
            width: !mobile ? 480 : '100%',
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
          pt: !tablet ? 0 : mobile ? 12 : 11,
        }}
      >
        <Image
          alt="background image for upload feature"
          src={uploadBg}
          style={{
            width: !tablet ? '50vw' : mobile ? '100%' : '70%',
            height: !tablet ? 500 : mobile ? 330 : 380,
            position: 'absolute',
            marginTop: !tablet ? -120 : mobile ? -50 : -60,
            right: 0,
            zIndex: -99,
          }}
        />
        <SectionTitle
          title="Cannot find a favourite?"
          summary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        />
        <Image
          alt="images for background features"
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
