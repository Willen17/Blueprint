import { AppBar, Avatar, Box, Modal, Typography } from '@mui/material';
import {
  IconArtboard,
  IconDeviceFloppy,
  IconDownload,
  IconLogout,
  IconPhotoPlus,
  IconTexture,
  IconUser,
} from '@tabler/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCanvas } from '../context/CanvasContext';
import { useSave } from '../context/SaveContext';
import { useUser } from '../context/UserContext';
import bpLogo from '../public/logo/bp-logo-light.png';
import IconWithText from './shared/IconWithText';
import { theme } from './theme';

const Header = () => {
  const { currentUser, handleGoogleSignIn, handleSignOut, isAuthenticated } =
    useUser();
  const {
    setOpenSaveModal,
    setOpenLogoModal,
    openLogoModal,
    saveCanvasToDataBase,
  } = useSave();
  const { canvas } = useCanvas();
  const [openUser, setOpenUser] = useState<boolean>(false);
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  const [title, setTitle] = useState<string>('Untitled');

  const handleClose = () => {
    setOpenUser(false);
    setOpenLogoModal(false);
  };

  const handleClickSignOut = () => {
    setOpenUser(false);
    handleSignOut();
  };

  useEffect(() => {
    if (canvas.title) {
      setTitle(canvas.title);
    }
  }, [canvas]);

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
          onClick={() => setOpenLogoModal(true)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            boxSizing: 'border-box',
            cursor: 'pointer',
            transition: '.5s',
          }}
        />
        <Typography variant="body1" component="h1">
          {title ? title : 'Untitled'}
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
      <Modal open={openLogoModal} onClose={handleClose}>
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
            <IconWithText
              text="Save"
              icon={IconDeviceFloppy}
              onClick={() => {
                canvas.title
                  ? saveCanvasToDataBase(canvas.title)
                  : setOpenSaveModal(true);
              }}
            />
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
          <Box sx={{ pl: 1, py: 0.5, textAlign: 'center' }}>
            {isAuthenticated ? (
              <>
                <Link href="/canvas" style={{ textDecoration: 'none' }}>
                  <IconWithText text="Canvas" icon={IconArtboard} />
                </Link>
                <Link
                  href="/admin/createBackground"
                  style={{ textDecoration: 'none' }}
                >
                  <IconWithText text="Add Background" icon={IconPhotoPlus} />
                </Link>
                <Link
                  href="/admin/createPoster"
                  style={{ textDecoration: 'none' }}
                >
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
        </Box>
      </Modal>
    </>
  );
};

export default Header;
