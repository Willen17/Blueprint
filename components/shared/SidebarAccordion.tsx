import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { IconChevronUp } from '@tabler/icons';
import { ReactNode } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { theme } from '../theme';

interface Props {
  panel: string;
  children: ReactNode;
}

const SidebarAccordion = (props: Props) => {
  const { expandedAccordion, setExpandedAccordion } = useCanvas();

  // TODO: logic to be fixed for editing from existing canvas, now it is only for "creating new"
  const handleCollapseAccordion = () => {
    setExpandedAccordion(false);
    // setFrame('');
    // setFrameDimension('');
  };

  return (
    <Accordion
      disableGutters
      square
      elevation={0}
      expanded={expandedAccordion === props.panel}
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
          expandedAccordion !== props.panel
            ? setExpandedAccordion(props.panel)
            : handleCollapseAccordion()
        }
      >
        <Typography variant="h1" component="h2">
          {props.panel}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          maxWidth: 280,
          minHeight: 'calc(100vh - 200px)',
          maxHeight: 'calc(100vh - 200px)',
          display: 'flex',
          flexDirection: props.panel !== '2. Frames' ? 'column' : null,
        }}
      >
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
};

export default SidebarAccordion;
