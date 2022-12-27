import { Box } from '@mui/material';
import { frameDimensions } from '../../../data/frameData';
import PlainFrame from '../../shared/PlainFrame';

const PlainBlackPreview = () => {
  return (
    <Box width={43} height={43} overflow="clip">
      <PlainFrame size={frameDimensions.xl} bgColor="#000">
        <></>
      </PlainFrame>
    </Box>
  );
};

export default PlainBlackPreview;
