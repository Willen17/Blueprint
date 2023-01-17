import { Button, Container, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '../../context/UserContext';
import bpLogo from '../../public/logo/bp-logo-dark.png';
import bpLogoText from '../../public/logo/bp-logotext-dark.png';
import { theme } from '../theme';

interface Props {
  noLoginButton?: boolean;
}

const HomeHeader = (props: Props) => {
  const { handleGoogleSignIn } = useUser();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Container
      component="header"
      sx={{
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        placeItems: ' center',
      }}
    >
      <Link href="/">
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
      </Link>
      {!props.noLoginButton ? (
        <Button
          onClick={handleGoogleSignIn}
          sx={{
            fontWeight: 500,
            mr: !mobile ? 10 : 0,
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
      ) : null}
    </Container>
  );
};

export default HomeHeader;
