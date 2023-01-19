import { Box } from '@mui/material';
import { frameDimensions } from '../../../data/frameData';
import maple from '../../../public/frameBg/maple-surface.jpg';
import PlainFrame from '../../shared/PlainFrame';

const PlainMaplePreview = () => {
  return (
    <Box width={43} height={43} overflow="hidden">
      <PlainFrame
        size={frameDimensions.xl}
        bgImg={{ src: maple, alt: 'Maple Frame' }}
      >
        <></>
      </PlainFrame>
    </Box>
  );
};

export default PlainMaplePreview;
