import { Box, Button } from '@mui/material';
import Image from 'next/image';
import { useUser } from '../../context/UserContext';
import bpLogo from '../../public/logo/bp-logo-dark.png';
import bpLogoText from '../../public/logo/bp-logotext-dark.png';

const HomeHeader = () => {
  const { handleGoogleSignIn } = useUser();

  return (
    <Box
      sx={{
        height: 100,
        pr: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        placeItems: ' center',
      }}
    >
      <Box>
        <Image
          priority
          width={49}
          height={51}
          alt="blueprint logo"
          src={bpLogo}
        />
        <Image
          priority
          width={147}
          height={40}
          alt="blueprint logotext"
          src={bpLogoText}
          style={{ marginLeft: 10 }}
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
