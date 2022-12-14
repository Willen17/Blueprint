import { useMediaQuery } from '@mui/material';
import { useSidebar } from '../../context/SidebarContext';
import { sidebarSections } from '../../lib/valSchemas';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import { theme } from '../theme';
import PosterSectionDetails from './PosterSectionDetails';

const PosterSection = () => {
  const mobile = useMediaQuery(theme.breakpoints.down(800));
  const { openMobileSection } = useSidebar();

  return mobile && openMobileSection !== sidebarSections[2] ? null : mobile &&
    openMobileSection === sidebarSections[2] ? (
    <MobileSidebarContainer>
      <PosterSectionDetails />
    </MobileSidebarContainer>
  ) : (
    <SidebarAccordion panel={sidebarSections[2]}>
      <PosterSectionDetails />
    </SidebarAccordion>
  );
};

export default PosterSection;
