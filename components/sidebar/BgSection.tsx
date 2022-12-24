import { useMediaQuery } from '@mui/material';
import { useCanvas } from '../../context/CanvasContext';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import { theme } from '../theme';
import { sidebarSections } from '../types';
import BgSectionDetails from './BgSectionDetails';

const BgSection = () => {
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { openMobileSection } = useCanvas();

  return mobile && openMobileSection !== sidebarSections[0] ? null : mobile &&
    openMobileSection === sidebarSections[0] ? (
    <MobileSidebarContainer>
      <BgSectionDetails />
    </MobileSidebarContainer>
  ) : (
    <SidebarAccordion panel="1. Backgrounds">
      <BgSectionDetails />
    </SidebarAccordion>
  );
};

export default BgSection;
