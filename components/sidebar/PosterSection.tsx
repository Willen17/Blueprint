import { useMediaQuery } from '@mui/material';
import { useCanvas } from '../../context/CanvasContext';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import { theme } from '../theme';
import { sidebarSections } from '../types';
import PosterSectionDetails from './PosterSectionDetails';

const PosterSection = () => {
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { openMobileSection } = useCanvas();

  return mobile && openMobileSection !== sidebarSections[2] ? null : mobile &&
    openMobileSection === sidebarSections[2] ? (
    <MobileSidebarContainer>
      <PosterSectionDetails />
    </MobileSidebarContainer>
  ) : (
    <SidebarAccordion panel="3. Posters">
      <PosterSectionDetails />
    </SidebarAccordion>
  );
};

export default PosterSection;
