import { Box, Container, Typography } from '@mui/material';
import {
  IconBrandGithub,
  IconCircleLetterM,
  IconCircleLetterW,
} from '@tabler/icons';
import Image from 'next/image';
import bpLogo from '../../public/logo/bp-logo-dark.png';
import bpLogoText from '../../public/logo/bp-logotext-dark.png';

const HomeFooter = () => {
  return (
    <Container
      component="footer"
      maxWidth={false}
      sx={{ padding: 0, overflowX: 'clip' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          placeItems: 'center',
          position: 'relative',
          mt: 10,
        }}
      >
        <Image
          priority
          width={45}
          height={45}
          alt="blueprint logo"
          src={bpLogo}
        />
        <Image
          priority
          width={70}
          height={20}
          alt="blueprint logotext"
          src={bpLogoText}
          style={{ marginTop: 5 }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            placeItems: 'center',
            my: 1.5,
          }}
        >
          <Typography fontSize={13}>c/o Medieinstitutet</Typography>
          <Typography fontSize={13}>
            Anders Personsgatan 18, 416 64 Gothenburg
          </Typography>
          <Typography fontSize={13}>Sweden</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            placeItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography fontSize={13} component="h4" fontWeight={600}>
            Contact Us
          </Typography>
          <Box>
            <IconCircleLetterW color="#3086B7" />
            <IconCircleLetterM color="#3086B7" style={{ marginLeft: 2 }} />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            textAlign: 'center',
            pb: 9,
          }}
        >
          <Typography fontSize={13} my={1.5} mr={0.5}>
            Privacy Policy | Terms & Conditions |  Cookie Settings |
          </Typography>
          <Typography
            fontSize={13}
            my={1.5}
            sx={{ display: 'flex', placeItems: 'center', gap: 0.2 }}
          >
            <IconBrandGithub stroke={1.5} size={18} />
            Github
          </Typography>
        </Box>

        <Box
          bgcolor="#FCFCFC"
          width="100vw"
          height={60}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: -24,
            display: 'flex',
            placeContent: 'center',
            placeItems: 'center',
          }}
        >
          <Typography fontWeight={200}>
            Copyright © 2023 blueprint. Designed and built by Wiliam Saar and
            Millie Cheung. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeFooter;
