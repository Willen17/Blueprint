import { useMediaQuery } from '@mui/material';
import { useCanvas } from '../../context/CanvasContext';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import { theme } from '../theme';
import { sidebarSections } from '../types';
import FrameSectionDetails from './FrameSectionDetails';

const FrameSection = () => {
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { openMobileSection } = useCanvas();

  return mobile && openMobileSection !== sidebarSections[1] ? null : mobile &&
    openMobileSection === sidebarSections[1] ? (
    <MobileSidebarContainer>
      <FrameSectionDetails />
    </MobileSidebarContainer>
  ) : (
    <SidebarAccordion panel={sidebarSections[1]}>
      <FrameSectionDetails />
    </SidebarAccordion>
  );
};

export default FrameSection;
