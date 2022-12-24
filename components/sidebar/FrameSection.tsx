import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControl,
  Switch,
  Typography,
} from '@mui/material';
import { IconCheck, IconChevronUp } from '@tabler/icons';
import Image from 'next/image';
import { useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import frame from '../../public/tempImages/frame.png';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';

const FrameSection = () => {
  const { setExpandedAccordion, expandedAccordion } = useCanvas();
  // TODO: add logic - how the states change the frame shown on canvas
  const [selectedFrame, setSelectedFrame] = useState<String>('');
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

  // TODO: logic to be fixed for editing from existing canvas, now it is only for "creating new"
  const handleCollapseAccordion = () => {
    setExpandedAccordion(false);
    setSelectedFrame('');
    setSelectedDimension('');
  };

  return (
    <Accordion
      disableGutters
      square
      elevation={0}
      expanded={expandedAccordion === 'framePanel'}
      sx={{
        border: `1px solid ${theme.palette.secondary.light}`,
        borderLeft: 'none',
        borderRight: 'none',
        '&:not(:last-child)': {
          borderBottom: 0,
        },
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <IconChevronUp size={16} color={theme.palette.primary.main} />
        }
        sx={{ bgcolor: '#FBFBFB', minHeight: 40, maxHeight: 40 }}
        onClick={() =>
          expandedAccordion !== 'framePanel'
            ? setExpandedAccordion('framePanel')
            : handleCollapseAccordion()
        }
      >
        <Typography variant="h1">2. Frames</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          maxWidth: 280,
          minHeight: 'calc(100vh - 200px)',
          maxHeight: 'calc(100vh - 200px)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'scroll',
        }}
      >
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
          {showMeFrames().map((frame, index) => (
            <Box
              key={index}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                height: 43,
                width: 43,
                boxShadow:
                  selectedFrame === index.toString() // TODO: change to ID
                    ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                    : null,
              }}
            >
              <Image
                width={43}
                height={43}
                alt="TITLE" // TODO: change to title
                src={frame.src}
                onClick={() => setSelectedFrame(index.toString())}
              />
              {/* TODO: adjust logic - this should not be index but id */}
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
                checked={selectedDimension === dimension}
                sx={{ p: 0 }}
                onClick={() => setSelectedDimension(dimension)}
              />
            </FormControl>
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default FrameSection;
