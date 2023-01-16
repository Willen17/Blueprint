import { Box } from '@mui/material';
import Image from 'next/image';
import dashedLineH from '../../public/homeImages/dashed-line-h.png';
import dashedLineV from '../../public/homeImages/dashed-line-v.png';
import bgImage from '../../public/homeImages/home-bg.png';
import framesImage from '../../public/homeImages/home-frames.png';
import postersImage from '../../public/homeImages/home-posters.png';
import uploadBg from '../../public/homeImages/home-upload-bg.png';
import uploadImage from '../../public/homeImages/home-upload.png';
import SectionTitle from '../shared/SectionTitle';

const HomeFeatures = () => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          width: '50%',
        }}
      >
        <SectionTitle
          sx={{ width: 400 }}
          title="Lorem Ipsum is simply background"
          summary="We know everyone has their own decor home style so we provide a wide variety of backgrounds for our users to choose from."
        />
        <Image
          alt="images for background features"
          src={bgImage}
          style={{
            width: '100%',
            height: '100%',
            paddingLeft: 15,
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          placeItems: 'end',
        }}
      >
        <SectionTitle
          sx={{ width: 400 }}
          title="Wonder how your wall looks like with different frames? "
          summary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        />
        <Image
          alt="images for background features"
          src={framesImage}
          style={{
            width: 400,
            height: '100%',
            paddingRight: 180,
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          width: '50%',
        }}
      >
        <SectionTitle
          sx={{ width: 400 }}
          title="Add your favourite posters xyz"
          summary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        />
        <Image
          alt="images for background features"
          src={postersImage}
          style={{
            width: 480,
            height: '100%',
            paddingLeft: 30,
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          placeItems: 'end',
        }}
      >
        <Image
          alt="background image for upload feature"
          src={uploadBg}
          style={{
            width: '50vw',
            height: 500,
            position: 'absolute',
            marginTop: -120,
            right: 0,
            zIndex: -99,
          }}
        />
        <SectionTitle
          sx={{ width: 400 }}
          title="Cannot find a favourite?"
          summary="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        />
        <Image
          alt="images for background features"
          src={uploadImage}
          style={{
            width: 180,
            height: '100%',
            paddingRight: 220,
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          width: '50%',
          minHeight: 220,
          mt: -10,
          position: 'relative',
        }}
      >
        <SectionTitle
          withButton
          sx={{ placeItems: 'center' }}
          title="Simple, right? Let's try your own!"
        />
        <Image
          width={10}
          height={925}
          alt="dashed line vertical"
          src={dashedLineV}
          style={{ position: 'absolute', bottom: -405, left: 0 }}
        />
        <Image
          width={925}
          height={10}
          alt="dashed line horizontal"
          src={dashedLineH}
          style={{ position: 'absolute', bottom: -10, left: -500 }}
        />
      </Box>
    </>
  );
};

export default HomeFeatures;
