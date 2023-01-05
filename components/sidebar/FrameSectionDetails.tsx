import { Box, Checkbox, FormControl, Switch, Typography } from '@mui/material';
import { IconCheck } from '@tabler/icons';
import { Fragment } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { frameDimensions, frames } from '../../data/frameData';
import { sidebarSections } from '../../lib/valSchemas';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';

const FrameSectionDetails = () => {
  const { frameSet, setFrameSet, setWithPassepartout, withPassepartout } =
    useCanvas();
  const { allFrames, setExpandedAccordion } = useSidebar();

  /** Renders correct frame JSX */
  const getFrameJSX = (id: string) => {
    const match = frames.filter((f) => f.id === id);
    return match.map((match) => (
      <Fragment key={match.id}>
        <match.frame />
      </Fragment>
    ));
  };

  /** Gets and renders available frame sizes from frame data */
  const getFrameSizes = () => {
    const arr = [];
    const currentFrame = allFrames
      .filter((fr) => fr.id === frameSet.id)
      .map((fr) => fr);
    const dimensionArr = Object.keys(frameDimensions).flatMap(
      (dimension) => dimension
    );
    const matches = currentFrame
      .flatMap((fr) => fr.sizes)
      .filter((size) => dimensionArr.map((dimension) => dimension === size));

    for (let i = 0; i < matches.length; i++) {
      if (dimensionArr.indexOf(matches[i]) !== -1)
        arr.push({
          ...frameDimensions[matches[i] as keyof typeof frameDimensions],
          size: matches[i],
        });
    }
    return arr.sort((a, b) => a.width - b.width);
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
              setWithPassepartout(() => (withPassepartout ? false : true))
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
            onClick={() =>
              setFrameSet((prevState) => ({
                ...prevState,
                id: fr.id!,
                title: fr.title,
              }))
            }
            sx={{
              cursor: 'pointer',
              position: 'relative',
              height: 43,
              width: 43,
              zIndex: 99,
              boxShadow:
                frameSet.id === fr.id
                  ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                  : null,
            }}
          >
            {getFrameJSX(fr.id!)}
            {frameSet.id === fr.id ? (
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

      {frameSet.id ? (
        <>
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
            {getFrameSizes().map((dimension, index) => (
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
                <Typography variant="body1">
                  {dimension.width + 'x' + dimension.height}
                </Typography>

                <Checkbox
                  value={dimension.width + 'x' + dimension.height}
                  size="small"
                  checked={frameSet.size === dimension.size}
                  sx={{ p: 0 }}
                  onClick={() => {
                    setFrameSet((prevState) => ({
                      ...prevState,
                      size: dimension.size,
                    }));
                    setExpandedAccordion(sidebarSections[2]);
                  }}
                />
              </FormControl>
            ))}
          </Box>
        </>
      ) : null}
    </>
  );
};

export default FrameSectionDetails;
