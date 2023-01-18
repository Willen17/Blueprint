import { Box, Container, Typography } from '@mui/material';
import {
  IconCornerDownRight,
  IconCornerUpLeft,
  IconDeviceMobile,
} from '@tabler/icons';
import Link from 'next/link';
import styles from '../../stylesheet/rotate.module.css';

const RotateDevice = () => {
  return (
    <Container
      sx={{
        height: 'calc(100vh-100px)',
        display: 'flex',
        placeContent: 'center',
        placeItems: 'center',
        columnGap: 2,
        flexDirection: 'column',
      }}
    >
      <Box className={styles.rotateDevice} sx={{ position: 'relative' }}>
        <IconCornerDownRight
          size={40}
          stroke={1.5}
          style={{ position: 'absolute', bottom: -20, left: -10 }}
        />
        <IconDeviceMobile size={150} stroke={0.5} color="#3A3335" />
        <IconCornerUpLeft
          size={40}
          stroke={1.5}
          style={{ position: 'absolute', top: -20, right: -10 }}
        />
      </Box>
      <Typography
        fontSize={25}
        component="h1"
        fontFamily="Comfortaa"
        fontWeight={600}
        color="#3A3335"
        sx={{ mt: 5 }}
      >
        Rotate your phone
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 0.5,
          placeItems: 'center',
        }}
      >
        <Typography variant="subtitle1">
          Our tool is made for landscape mode
        </Typography>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Typography
            variant="body1"
            color="#3086B7"
            sx={{ '&:hover': { color: '#000' } }}
          >
            Back to homepage
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};

export default RotateDevice;
