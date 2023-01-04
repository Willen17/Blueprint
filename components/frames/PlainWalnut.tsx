import { Box } from '@mui/material';
import Image from 'next/image';
import { useCanvas } from '../../context/CanvasContext';
import walnut from '../../public/frameBg/walnut-surface.jpeg';
import monaLisa from '../../public/tempImages/mona-lisa.jpg';
import PlainFrame from '../shared/PlainFrame';
import { Dimension } from '../types';

interface Props {
  size: Dimension;
}

const PlainWalnut = (props: Props) => {
  const { withPassepartout } = useCanvas();

  return (
    <PlainFrame size={props.size} bgImg={{ src: walnut, alt: 'Walnut Frame' }}>
      {withPassepartout ? (
        <Box
          sx={{
            height: '70%',
            width: '70%',
            m: 'auto auto',
            display: 'flex',
          }}
        >
          <Image
            alt="Mona Lisa"
            src={monaLisa}
            style={{
              background: '#fff',
              width: '100%',
              height: '100%',
              display: 'block',
              padding: '1.5%',
              boxShadow: 'inset 0px 0.1em 0.1em rgba(0, 0, 0, 0.2)',
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            height: '100%',
            width: '100%',
            m: 'auto auto',
            display: 'flex',
          }}
        >
          <Image
            alt="Mona Lisa"
            src={monaLisa}
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          />
        </Box>
      )}
    </PlainFrame>
  );
};

export default PlainWalnut;
