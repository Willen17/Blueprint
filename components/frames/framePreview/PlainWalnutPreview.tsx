import { Box } from '@mui/material';
import { frameDimensions } from '../../../data/frameData';
import walnut from '../../../public/frameBg/walnut-surface.jpeg';
import PlainFrame from '../../shared/PlainFrame';

const PlainWalnutPreview = () => {
  return (
    <Box width={43} height={43} overflow="hidden">
      <PlainFrame
        size={frameDimensions.xl}
        bgImg={{ src: walnut, alt: 'Walnut Frame' }}
      >
        <></>
      </PlainFrame>
    </Box>
  );
};

export default PlainWalnutPreview;
