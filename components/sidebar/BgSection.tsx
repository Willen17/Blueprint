import { useMediaQuery } from '@mui/material';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import { theme } from '../theme';
import BgSectionDetails from './BgSectionDetails';

const BgSection = () => {
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return mobile ? (
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
