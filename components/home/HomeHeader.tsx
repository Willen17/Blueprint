import { Box, Button, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useUser } from '../../context/UserContext';
import bpLogo from '../../public/logo/bp-logo-dark.png';
import bpLogoText from '../../public/logo/bp-logotext-dark.png';
import { theme } from '../theme';

const HomeHeader = () => {
  const { handleGoogleSignIn } = useUser();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        height: 100,
        pr: !mobile ? 10 : 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        placeItems: ' center',
      }}
    >
      <Box>
        <Image
          priority
          width={!mobile ? 49 : 33}
          height={!mobile ? 51 : 35}
          alt="blueprint logo"
          src={bpLogo}
        />
        <Image
          priority
          width={!mobile ? 147 : 115}
          height={!mobile ? 40 : 31}
          alt="blueprint logotext"
          src={bpLogoText}
          style={{ marginLeft: !mobile ? 10 : 5 }}
        />
      </Box>
      <Button
        onClick={handleGoogleSignIn}
        sx={{
          fontWeight: 500,
          background: '#3A3335',
          padding: '16px 10px',
          color: '#fff',
          '&:hover': {
            background: '#EFEFEF',
            color: '#3A3335',
          },
        }}
      >
        Google Login
      </Button>
    </Box>
  );
};

export default HomeHeader;
