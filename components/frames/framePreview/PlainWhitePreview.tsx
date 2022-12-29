import { Box } from '@mui/material';
import { frameDimensions } from '../../../data/frameData';
import PlainFrame from '../../shared/PlainFrame';

const PlainWhitePreview = () => {
  return (
    <Box width={43} height={43} overflow="clip" border="1px solid #F2EFEF">
      <PlainFrame isWhiteFrame size={frameDimensions.xl}>
        <></>
      </PlainFrame>
    </Box>
  );
};

export default PlainWhitePreview;
