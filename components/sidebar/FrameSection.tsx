import { useMediaQuery } from '@mui/material';
import { useSidebar } from '../../context/SidebarContext';
import { sidebarSections } from '../../lib/valSchemas';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import { theme } from '../theme';
import FrameSectionDetails from './FrameSectionDetails';

const FrameSection = () => {
  const mobile = useMediaQuery(theme.breakpoints.down(800));
  const { openMobileSection } = useSidebar();

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
