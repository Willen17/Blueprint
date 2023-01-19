import { useSidebar } from '../../context/SidebarContext';
import { sidebarSections } from '../../lib/valSchemas';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import BgSectionDetails from './BgSectionDetails';

const BgSection = ({ mobile }: { mobile: boolean | undefined }) => {
  const { openMobileSection } = useSidebar();

  return mobile && openMobileSection !== sidebarSections[0] ? null : mobile &&
    openMobileSection === sidebarSections[0] ? (
    <MobileSidebarContainer>
      <BgSectionDetails mobile={mobile} />
    </MobileSidebarContainer>
  ) : (
    <SidebarAccordion panel={sidebarSections[0]}>
      <BgSectionDetails mobile={mobile} />
    </SidebarAccordion>
  );
};

export default BgSection;
