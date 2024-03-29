import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import {
  IconBrandGithub,
  IconCircleLetterM,
  IconCircleLetterW,
} from '@tabler/icons';
import Image from 'next/image';
import bpLogo from '../../public/logo/bp-logo-dark.png';
import bpLogoText from '../../public/logo/bp-logotext-dark.png';
import { theme } from '../theme';

const HomeFooter = () => {
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

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
          <Typography fontSize={!mobile ? 13 : 12}>
            c/o Medieinstitutet
          </Typography>
          <Typography fontSize={!mobile ? 13 : 12}>
            Anders Personsgatan 18, 416 64 Gothenburg
          </Typography>
          <Typography fontSize={!mobile ? 13 : 12}>Sweden</Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            placeItems: 'center',
            gap: 0.5,
          }}
        >
          <Typography
            fontSize={!mobile ? 13 : 12}
            component="h4"
            fontWeight={600}
          >
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
            placeItems: 'center',
            flexDirection: !mobile ? 'row' : 'column',
            textAlign: 'center',
            pt: 1.5,
            gap: 0.5,
            pb: !mobile ? 11 : 9,
          }}
        >
          <Typography fontSize={!mobile ? 13 : 11} mr={0.5}>
            Privacy Policy | Terms & Conditions {!mobile ? '| ' : ' '}
          </Typography>
          <Typography
            fontSize={!mobile ? 13 : 11}
            sx={{ display: 'flex', gap: 0.5 }}
          >
            Cookie Settings |
            <Box
              component="a"
              href="https://github.com/Willen17/Blueprint"
              target="_blank"
              rel="noreferrer"
              sx={{
                textDecoration: 'none',
                color: '#000',
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
            </Box>
          </Typography>
        </Box>

        <Box
          bgcolor="#FCFCFC"
          width={!mobile ? '100vw' : '100%'}
          height={60}
          sx={{
            position: 'absolute',
            bottom: 0,
            left: !mobile ? -24 : 0,
            display: 'flex',
            placeContent: 'center',
            placeItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography
            fontWeight={200}
            fontSize={!mobile ? 11 : 9}
            sx={{ m: 'auto', textAlign: 'center' }}
          >
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
