import { useMediaQuery } from '@mui/material';
import { useSidebar } from '../../context/SidebarContext';
import { sidebarSections } from '../../lib/valSchemas';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import { theme } from '../theme';
import BgSectionDetails from './BgSectionDetails';

const BgSection = () => {
  const mobile = useMediaQuery(theme.breakpoints.down(800));
  const { openMobileSection } = useSidebar();

  return mobile && openMobileSection !== sidebarSections[0] ? null : mobile &&
    openMobileSection === sidebarSections[0] ? (
    <MobileSidebarContainer>
      <BgSectionDetails />
    </MobileSidebarContainer>
  ) : (
    <SidebarAccordion panel={sidebarSections[0]}>
      <BgSectionDetails />
    </SidebarAccordion>
  );
};

export default BgSection;
