import { useMediaQuery } from '@mui/material';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import { theme } from '../theme';
import FrameSectionDetails from './FrameSectionDetails';

const FrameSection = () => {
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return mobile ? (
    <MobileSidebarContainer>
      <FrameSectionDetails />
    </MobileSidebarContainer>
  ) : (
    <SidebarAccordion panel="2. Frames">
      <FrameSectionDetails />
    </SidebarAccordion>
  );
};

export default FrameSection;
