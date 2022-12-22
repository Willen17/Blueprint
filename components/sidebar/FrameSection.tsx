import { Box, Checkbox, FormControl, Switch, Typography } from '@mui/material';
import Image from 'next/image';
import frame from '../../public/tempImages/frame.png';

const FrameSection = () => {
  const showMeFrames = () => {
    const arr = [];
    for (let i = 0; i <= 30; i++) {
      arr.push({ src: frame });
      i++;
    }
    return arr;
  };
  const dimensions = ['21x30', '30x40', '40x50', '50x70', '70x100'];

  return (
    <Box sx={{ minWidth: 210 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          placeItems: 'center',
          py: 2,
        }}
      >
        <Typography variant="subtitle1">Frame Type</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            placeItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography variant="body2">Passepassout</Typography>
          <Switch />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {showMeFrames().map((frame, index) => (
          <Image
            key={index}
            width={40}
            height={40}
            alt="frame"
            src={frame.src}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          placeItems: 'center',
          py: 2,
        }}
      >
        <Typography variant="subtitle1">Size (cm)</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {dimensions.map((dimension, index) => (
          <FormControl
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              placeItems: 'center',
              py: 0,
              height: 25,
            }}
          >
            <Typography variant="body1">{dimension}</Typography>
            <Checkbox value={dimension} size="small" sx={{ p: 0 }} />
          </FormControl>
        ))}
      </Box>
    </Box>
  );
};

export default FrameSection;
