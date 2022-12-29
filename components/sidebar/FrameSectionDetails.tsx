import { Box, Checkbox, FormControl, Switch, Typography } from '@mui/material';
import { IconCheck } from '@tabler/icons';
import { Fragment } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { frames } from '../../data/frameData';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';

const FrameSectionDetails = () => {
  const {
    setFrame,
    frame,
    setFrameDimension,
    frameDimension,
    setWithPassepartout,
    withPassepartout,
    allFrames,
  } = useCanvas();

  // TODO: get dimensions from data instead
  const dimensions = ['21x30', '30x40', '40x50', '50x70', '70x100'];

  const getFrameJSX = (id: string) => {
    const match = frames.filter((f) => f.id === id);
    return match.map((m, index) => (
      <Fragment key={index}>
        <m.frame />
      </Fragment>
    ));
  };

  return (
    <>
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
          <Switch
            checked={withPassepartout}
            onChange={() =>
              setWithPassepartout(withPassepartout ? false : true)
            }
          />
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
        {allFrames.map((fr) => (
          <Box
            key={fr.id}
            onClick={() => setFrame(fr.id!)}
            sx={{
              cursor: 'pointer',
              position: 'relative',
              height: 43,
              width: 43,
              zIndex: 99,
              boxShadow:
                frame === fr.id ? '0px 2px 5px rgba(0, 0, 0, 0.25)' : null,
            }}
          >
            {getFrameJSX(fr.id!)}
            {frame === fr.id ? (
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
          pb: 2.5,
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {/* TODO: show only available frame sizes */}
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
    </>
  );
};

export default FrameSectionDetails;
