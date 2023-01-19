import { useSidebar } from '../../context/SidebarContext';
import { sidebarSections } from '../../lib/valSchemas';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import PosterSectionDetails from './PosterSectionDetails';

const PosterSection = ({ mobile }: { mobile: boolean | undefined }) => {
  const { openMobileSection } = useSidebar();

  return mobile && openMobileSection !== sidebarSections[2] ? null : mobile &&
    openMobileSection === sidebarSections[2] ? (
    <MobileSidebarContainer>
      <PosterSectionDetails mobile={mobile} />
    </MobileSidebarContainer>
  ) : (
    <SidebarAccordion panel={sidebarSections[2]}>
      <PosterSectionDetails mobile={mobile} />
    </SidebarAccordion>
  );
};

export default PosterSection;
