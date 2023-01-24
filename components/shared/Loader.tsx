import { Container, Typography } from '@mui/material';
import Image from 'next/image';
import { useNotification } from '../../context/NotificationContext';
import bpLogoLower from '../../public/logo/bp-logo-lower.png';
import bpLogoUpper from '../../public/logo/bp-logo-upper.png';
import styles from '../../stylesheet/loader.module.css';

const Loader = () => {
  const { isLoading } = useNotification();
  return (
    <Container
      sx={{
        height: 'calc(100vh - 50px)',
        display: 'flex',
        flexDirection: 'column',
        placeContent: 'center',
        placeItems: 'center',
        columnGap: 2,
        flexWrap: 'wrap',
      }}
    >
      <Image alt="Blueprint Logo Upper" src={bpLogoUpper} width={50} />
      <Image
        alt="Blueprint Logo Lower"
        className={styles.logolower}
        src={bpLogoLower}
        width={45}
        style={{ marginLeft: 4, marginTop: -5 }}
      />
      <Typography mt={1} variant="subtitle1">
        {isLoading.message ? isLoading.message : 'Loading'}
      </Typography>
    </Container>
  );
};

export default Loader;
