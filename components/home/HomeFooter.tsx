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
            <Box
              component="a"
              href="https://github.com/Willen17"
              target="_blank"
              rel="noreferrer"
              sx={{
                color: '#3086B7',
                '&:hover': {
                  color: '#3A3335',
                },
              }}
            >
              <IconCircleLetterW />
            </Box>
            <Box
              component="a"
              href="https://github.com/millie-wy"
              target="_blank"
              rel="noreferrer"
              sx={{
                color: '#3086B7',
                '&:hover': {
                  color: '#3A3335',
                },
              }}
            >
              <IconCircleLetterM style={{ marginLeft: 2 }} />
            </Box>
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
          <a
            href="https://github.com/Willen17/Blueprint"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: '#000' }}
          >
            <Typography
              fontSize={13}
              my={1.5}
              sx={{
                display: 'flex',
                placeItems: 'center',
                gap: 0.2,
                '&:hover': {
                  color: '#3086B7',
                },
              }}
            >
              <IconBrandGithub stroke={1.5} size={18} />
              Github
            </Typography>
          </a>
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
            Copyright © 2023 blueprint. Designed and built by{' '}
            <Box
              component="a"
              href="https://github.com/Willen17"
              target="_blank"
              rel="noreferrer"
              sx={{
                textDecoration: 'none',
                color: '#000',
                '&:hover': {
                  color: '#3086B7',
                },
              }}
            >
              Wiliam Saar
            </Box>{' '}
            and{' '}
            <Box
              component="a"
              href="https://github.com/millie-wy"
              target="_blank"
              rel="noreferrer"
              sx={{
                textDecoration: 'none',
                color: '#000',
                '&:hover': {
                  color: '#3086B7',
                },
              }}
            >
              Millie Cheung
            </Box>
            . All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default HomeFooter;
