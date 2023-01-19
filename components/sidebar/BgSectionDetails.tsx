import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { IconCheck } from '@tabler/icons';
import Image from 'next/image';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { useUser } from '../../context/UserContext';
import { backgroundCategories as bgCategories } from '../../lib/valSchemas';
import { compareUserAndCreatedAt } from '../helper';
import UploadButton from '../imageUpload/UploadButton';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';

const BgSectionDetails = () => {
  const { getBackground, setBackground } = useCanvas();
  const { setBackgroundCategories, backgroundCategories, allBackgrounds } =
    useSidebar();
  const mobile = useMediaQuery(theme.breakpoints.down(800));
  const { currentUser } = useUser();

  function setCategory(category: string) {
    let newFilter = { ...backgroundCategories };
    for (let key in newFilter) {
      if (key == category) {
        newFilter[key as keyof typeof backgroundCategories] =
          !backgroundCategories[key as keyof typeof backgroundCategories];
      }
    }
    setBackgroundCategories(newFilter);
  }
  const noCategory = Object.values(backgroundCategories).every(
    (v) => v === false
  );

  const bgsFromSystemAndUser = allBackgrounds
    .filter((bg) => !bg.user || bg.user === currentUser?.uid)
    .sort(compareUserAndCreatedAt);

  const filteredItems = bgsFromSystemAndUser.filter((item) => {
    const itemCategories = item.categories;
    return Object.keys(backgroundCategories).some((category) => {
      return (
        backgroundCategories[category as keyof typeof backgroundCategories] &&
        itemCategories.includes(category)
      );
    });
  });

  return (
    <>
      <SidebarSubtitle subtitle="Background Type" />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {bgCategories.map((category, index) => (
          <Button
            key={index}
            value={category}
            sx={{
              bgcolor: backgroundCategories[
                category as keyof typeof backgroundCategories
              ]
                ? theme.palette.primary.main
                : null,
              color: backgroundCategories[
                category as keyof typeof backgroundCategories
              ]
                ? theme.palette.primary.contrastText
                : null,
            }}
            onClick={() => setCategory(category)}
          >
            {category === 'User upload' ? 'Uploaded by me' : category}
          </Button>
        ))}
      </Box>
      <Box
        pb={2}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          width: '100%',
          justifyContent: 'center',
          my: 2,
          overflowY: !mobile ? 'scroll' : 'null',
          '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            borderRadius: 5,
            outline: 'none',
          },
        }}
      >
        {noCategory ? (
          bgsFromSystemAndUser.map((bg, index) => (
            <Box
              key={index}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                height: 55,
                boxShadow:
                  getBackground()?.image === bg.image
                    ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                    : null,
              }}
            >
              <Image
                width={65}
                height={55}
                alt={bg.title}
                src={bg.image}
                onClick={() => setBackground(bg)}
              />
              {getBackground()?.image === bg.image ? (
                <IconCheck
                  stroke={1}
                  color={theme.palette.primary.contrastText}
                  size={15}
                  style={{
                    background: theme.palette.primary.main,
                    opacity: 0.7,
                    borderRadius: 50,
                    padding: 2,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ) : null}
            </Box>
          ))
        ) : filteredItems.length < 1 ? (
          <Typography mt={3} textAlign="center">
            No images found under this category
          </Typography>
        ) : (
          filteredItems.map((bg, index) => (
            <Box
              key={index}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                height: 55,
                boxShadow:
                  getBackground()?.image === bg.image
                    ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                    : null,
              }}
            >
              <Image
                width={65}
                height={55}
                alt={bg.title}
                src={bg.image}
                onClick={() => setBackground(bg)}
              />
              {getBackground()?.image === bg.image ? (
                <IconCheck
                  stroke={1}
                  color={theme.palette.primary.contrastText}
                  size={15}
                  style={{
                    background: theme.palette.primary.main,
                    opacity: 0.7,
                    borderRadius: 50,
                    padding: 2,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ) : null}
            </Box>
          ))
        )}
        <UploadButton for="Background" />
      </Box>
    </>
  );
};

export default BgSectionDetails;
