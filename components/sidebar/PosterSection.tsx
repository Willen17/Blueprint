import { Accordion, AccordionSummary, Typography } from '@mui/material';
import { IconChevronUp } from '@tabler/icons';
import { useCanvas } from '../../context/CanvasContext';
import { theme } from '../theme';
import PosterSectionDetails from './PosterSectionDetails';

const PosterSection = () => {
  const {
    setExpandedAccordion,
    expandedAccordion,
    setPosterOrientation,
    setPosterCategory,
  } = useCanvas();

  // TODO: logic to be fixed for editing from existing canvas, now it is only for "creating new"
  const handleCollapseAccordion = () => {
    setExpandedAccordion(false);
    setPosterCategory('');
    setPosterOrientation('');
  };

  return (
    <Accordion
      disableGutters
      square
      elevation={0}
      expanded={expandedAccordion === 'posterPanel'}
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
          expandedAccordion !== 'posterPanel'
            ? setExpandedAccordion('posterPanel')
            : handleCollapseAccordion()
        }
      >
        <Typography variant="h1">3. Posters</Typography>
      </AccordionSummary>
      <PosterSectionDetails />
    </Accordion>
  );
};

export default PosterSection;
