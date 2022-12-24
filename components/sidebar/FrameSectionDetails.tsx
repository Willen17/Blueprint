import { Box, Checkbox, FormControl, Switch, Typography } from '@mui/material';
import { IconCheck } from '@tabler/icons';
import Image from 'next/image';
import { useCanvas } from '../../context/CanvasContext';
import frameImg from '../../public/tempImages/frame.png';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';

const FrameSectionDetails = () => {
  const { setFrame, frame, setFrameDimension, frameDimension } = useCanvas();

  // TODO: get dimensions from data instead
  const dimensions = ['21x30', '30x40', '40x50', '50x70', '70x100'];

  // To be deleted after we have inserted frames from data
  const showMeFrames = () => {
    const arr = [];
    for (let i = 0; i <= 30; i++) {
      arr.push({ src: frameImg });
      i++;
    }
    return arr;
  };

  return (
    <Box>
      <SidebarSubtitle subtitle="Frame Type">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            placeItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography variant="body2">Passepartout</Typography>
          <Switch /> {/* TODO: apply logic */}
        </Box>
      </SidebarSubtitle>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'start',
          gap: 2,
          ml: 1.5,
          width: 230,
        }}
      >
        {showMeFrames().map((fr, index) => (
          <Box
            key={index}
            sx={{
              cursor: 'pointer',
              position: 'relative',
              height: 43,
              width: 43,
              boxShadow:
                frame === index.toString() // TODO: change to ID
                  ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                  : null,
            }}
          >
            <Image
              width={43}
              height={43}
              alt="TITLE" // TODO: change to title
              src={fr.src}
              onClick={() => setFrame(index.toString())}
            />
            {/* TODO: adjust logic - this should not be index but id */}
            {frame === index.toString() ? (
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
      <SidebarSubtitle subtitle="Size (cm)" />
      <Box
        sx={{
          mt: -1,
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
              checked={frameDimension === dimension}
              sx={{ p: 0 }}
              onClick={() => setFrameDimension(dimension)}
            />
          </FormControl>
        ))}
      </Box>
    </Box>
  );
};

export default FrameSectionDetails;
