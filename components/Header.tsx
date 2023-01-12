import { AppBar, Avatar, Box, Link, Modal, Typography } from '@mui/material';
import {
  IconDeviceFloppy,
  IconDownload,
  IconLogout,
  IconPhotoPlus,
  IconTexture,
  IconUser,
} from '@tabler/icons';
import Image from 'next/image';
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import bpLogo from '../public/logo/bp-logo.png';
import IconWithText from './shared/IconWithText';
import { theme } from './theme';

const Header = () => {
  const { currentUser, handleGoogleSignIn, handleSignOut, isAuthenticated } =
    useUser();
  const [openUser, setOpenUser] = useState<boolean>(false);
  const [openSave, setOpenSave] = useState<boolean>(false);
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const handleClose = () => {
    setOpenUser(false);
    setOpenSave(false);
  };

  const handleClickSignOut = () => {
    setOpenUser(false);
    handleSignOut();
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          height: 50,
          bgcolor: '#3A3335',
          boxShadow: 'none',
          flexDirection: 'row',
          justifyContent: 'space-between',
          placeItems: 'center',
          px: 3,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Image
          priority
          width={isHovering ? 26 : 25}
          height={isHovering ? 26 : 25}
          alt="Blueprint Logo"
          src={bpLogo}
          onClick={() => setOpenSave(true)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            boxSizing: 'border-box',
            cursor: 'pointer',
            transition: '.5s',
          }}
        />
        <Typography variant="body2">
          Untitled {/* TODO: insert from canvas data */}
        </Typography>
        {currentUser ? (
          <Avatar
            onClick={() => setOpenUser(true)}
            alt={currentUser.displayName! || currentUser.email!}
            src={currentUser.photoURL!}
            sx={{
              fontSize: 11,
              width: 25,
              height: 25,
              cursor: 'pointer',
              boxSizing: 'border-box',
              '&:hover': {
                width: 26,
                height: 26,
                transition: '.5s',
              },
            }}
          />
        ) : (
          <Box sx={{ '&:hover': { color: '#3086B7' } }}>
            <IconUser
              onClick={handleGoogleSignIn}
              width={25}
              stroke={1.5}
              style={{ cursor: 'pointer' }}
            />
          </Box>
        )}
      </AppBar>

      {/* Below are modals displaying by clicking logo or user icon */}
      <Modal open={openSave} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: 55,
            left: 5,
            width: 100,
            bgcolor: '#3A3335',
            outline: 0,
          }}
        >
          <Box sx={{ pl: 1, py: 0.5, textAlign: 'center' }}>
            {/* TODO: add onClick function to both buttons */}
            <IconWithText text="Save" icon={IconDeviceFloppy} />
            <IconWithText text="Export" icon={IconDownload} />
          </Box>
        </Box>
      </Modal>

      <Modal open={openUser} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: 55,
            right: 5,
            bgcolor: '#3A3335',
            outline: 0,
            px: 1,
          }}
        >
          {isAuthenticated ? (
            <>
              <Link href="/admin/createBackground" underline="none">
                <IconWithText text="Add Background" icon={IconPhotoPlus} />
              </Link>
              <Link href="/admin/createPoster" underline="none">
                <IconWithText text="Add Poster" icon={IconTexture} />
              </Link>
            </>
          ) : null}
          <IconWithText
            text="Sign out"
            icon={IconLogout}
            onClick={handleClickSignOut}
          />
        </Box>
      </Modal>
    </>
  );
};

export default Header;
