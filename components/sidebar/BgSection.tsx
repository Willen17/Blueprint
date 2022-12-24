import { Accordion, AccordionSummary, Typography } from '@mui/material';
import { IconChevronUp } from '@tabler/icons';
import { useCanvas } from '../../context/CanvasContext';
import { theme } from '../theme';
import BgSectionDetails from './BgSectionDetails';

const BgSection = () => {
  const {
    expandedAccordion,
    setExpandedAccordion,
    setBackground,
    setBackgroundCategory,
  } = useCanvas();

  // TODO: logic to be fixed for editing from existing canvas, now it is only for "creating new"
  const handleCollapseAccordion = () => {
    setExpandedAccordion(false);
    setBackgroundCategory('');
    setBackground('');
  };

  return (
    <Accordion
      disableGutters
      square
      elevation={0}
      expanded={expandedAccordion === 'backgroundPanel'}
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
          expandedAccordion !== 'backgroundPanel'
            ? setExpandedAccordion('backgroundPanel')
            : handleCollapseAccordion()
        }
      >
        <Typography variant="h1">1. Backgrounds</Typography>
      </AccordionSummary>
      <BgSectionDetails />
    </Accordion>
  );
};

export default BgSection;
