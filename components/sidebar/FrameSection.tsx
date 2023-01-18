import { useSidebar } from '../../context/SidebarContext';
import { sidebarSections } from '../../lib/valSchemas';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import FrameSectionDetails from './FrameSectionDetails';

const FrameSection = ({ mobile }: { mobile: boolean | undefined }) => {
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
