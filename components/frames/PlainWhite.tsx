import { Box } from '@mui/material';
import Image from 'next/image';
import { useCanvas } from '../../context/CanvasContext';
import monaLisa from '../../public/tempImages/mona-lisa.jpg';

const PlainWhite = () => {
  const { withPassepartout } = useCanvas();

  return (
    // outer
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        width: '175px',
        height: '245px',
        background: '#fff',
        zIndex: '-2',
        boxSizing: 'border-box',
        boxShadow:
          '0px 1em 2em -1em rgba(0, 0, 0, 0.4), 0px 1em 1em -1em rgba(0, 0, 0, 0.15), 0px 1em 1em -1em rgba(0, 0, 0, 0.15),0px 1em 1.5em -1em rgba(0,0,0,.15), 0px 1em 1em 0.5em rgba(0, 0, 0, 0.1), inset 0 .2em .1em #fff',
      }}
    >
      {/* Inner */}
      {withPassepartout ? (
        <Box
          sx={{
            width: '90%',
            height: '92%',
            m: 'auto auto',
            bgcolor: '#f8f8f8',
            zIndex: '-1',
            display: 'flex',
            boxShadow:
              'inset 0px 8px 0.5em rgba(0, 0, 0, 0.25), inset 0.1em 0px 0.1em rgba(0, 0, 0, 0.1),inset -0.1em 0px 0.1em rgba(0, 0, 0, 0.05), 0 0.3em 0.2em #fff',
          }}
        >
          {/* Container for image */}
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
                padding: '1%',
                boxShadow: 'inset 0px 0.1em 0.1em rgba(0, 0, 0, 0.2)',
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: '90%',
            height: '92%',
            m: 'auto auto',
            bgcolor: '#f8f8f8',
            display: 'flex',
            boxShadow:
              'inset 0px 8px 0.5em rgba(0, 0, 0, 0.25), inset 0.1em 0px 0.1em rgba(0, 0, 0, 0.1),inset -0.1em 0px 0.1em rgba(0, 0, 0, 0.05), 0 0.3em 0.2em #fff',
          }}
        >
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
        </Box>
      )}
    </Box>
  );
};

export default PlainWhite;
