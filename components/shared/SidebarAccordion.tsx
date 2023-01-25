import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { IconChevronUp } from '@tabler/icons';
import { ReactNode } from 'react';
import { useSidebar } from '../../context/SidebarContext';
import { sidebarSections } from '../../lib/valSchemas';
import { theme } from '../theme';

interface Props {
  panel: string;
  children: ReactNode;
}

const SidebarAccordion = (props: Props) => {
  const { expandedAccordion, setExpandedAccordion, isEditingFrame } =
    useSidebar();

  /* Collapse the accordion */
  const handleCollapseAccordion = () => setExpandedAccordion(false);

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
          {sidebarSections.indexOf(props.panel) + 1}. {props.panel}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          maxWidth: 280,
          maxHeight: isEditingFrame.item
            ? 'calc(100vh - 237px)'
            : 'calc(100vh - 200px)',
          height: isEditingFrame.item
            ? 'calc(100vh - 237px)'
            : 'calc(100vh - 200px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {props.children}
      </AccordionDetails>
    </Accordion>
  );
};

export default SidebarAccordion;
