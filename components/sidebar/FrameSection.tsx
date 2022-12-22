import { Box, Checkbox, FormControl, Switch, Typography } from '@mui/material';
import { IconCheck } from '@tabler/icons';
import Image from 'next/image';
import { useState } from 'react';
import frame from '../../public/tempImages/frame.png';
import { theme } from '../theme';

const FrameSection = () => {
  // TODO: add logic - how the states change the frame shown on canvas
  const [selectedFrame, setSelectedFrame] = useState<String>();
  const [selectedDimension, setSelectedDimension] = useState<String>('21x30');

  // TODO: get dimensions from data instead
  const dimensions = ['21x30', '30x40', '40x50', '50x70', '70x100'];

  // To be deleted after we have inserted frames from data
  const showMeFrames = () => {
    const arr = [];
    for (let i = 0; i <= 30; i++) {
      arr.push({ src: frame });
      i++;
    }
    return arr;
  };

  return (
    <Box sx={{ minWidth: 210, pb: 2 }}>
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
          <Switch /> {/* TODO: apply logic */}
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
          <Box key={index} sx={{ position: 'relative', height: 40, width: 40 }}>
            <Image
              width={40}
              height={40}
              alt="frame"
              src={frame.src}
              onClick={() => setSelectedFrame(index.toString())}
            />
            {/* TODO: adjust logic */}
            {selectedFrame === index.toString() ? (
              <IconCheck
                stroke={1}
                color={theme.palette.primary.contrastText}
                size={15}
                style={{
                  background: theme.palette.primary.main,
                  opacity: 0.7,
                  borderRadius: 50,
                  padding: 2,
                  position: 'absolute',
                  right: 3,
                  bottom: 3,
                }}
              />
            ) : null}
          </Box>
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
            <Checkbox
              value={dimension}
              size="small"
              checked={selectedDimension === dimension}
              sx={{ p: 0 }}
              onClick={() => setSelectedDimension(dimension)}
            />
          </FormControl>
        ))}
      </Box>
    </Box>
  );
};

export default FrameSection;
