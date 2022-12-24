import { useMediaQuery } from '@mui/material';
import MobileSidebarContainer from '../shared/MobileSidebarContainer';
import SidebarAccordion from '../shared/SidebarAccordion';
import { theme } from '../theme';
import PosterSectionDetails from './PosterSectionDetails';

const PosterSection = () => {
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return mobile ? (
    <MobileSidebarContainer>
      <PosterSectionDetails />
    </MobileSidebarContainer>
  ) : (
    <SidebarAccordion panel="3. Posters">
      <PosterSectionDetails />
    </SidebarAccordion>
  );
};

export default PosterSection;
