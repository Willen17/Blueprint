import { Box, Button, Typography } from '@mui/material';
import { IconCheck, IconX } from '@tabler/icons';
import Image from 'next/image';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { useUpload } from '../../context/UploadContext';
import { useUser } from '../../context/UserContext';
import { backgroundCategories as bgCategories } from '../../lib/valSchemas';
import { compareUserAndCreatedAt } from '../helper';
import UploadButton from '../imageUpload/UploadButton';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';

const BgSectionDetails = ({ mobile }: { mobile: boolean | undefined }) => {
  const { getBackground, setBackground } = useCanvas();
  const { setOpenRemoveImgModal, setObjToRemove } = useUpload();
  const { currentUser } = useUser();
  const { setBackgroundCategories, backgroundCategories, allBackgrounds } =
    useSidebar();

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
              {currentUser?.uid && bg.user === currentUser.uid && (
                <Box
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': { color: '#E23A22' },
                  }}
                >
                  <IconX
                    size={14}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      background: theme.palette.secondary.light,
                      opacity: 0.5,
                      zIndex: 999,
                    }}
                    onClick={() => {
                      setOpenRemoveImgModal(true);
                      setObjToRemove(bg);
                    }}
                  />
                </Box>
              )}
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
              {currentUser?.uid && bg.user === currentUser.uid && (
                <Box
                  sx={{
                    color: theme.palette.primary.main,
                    '&:hover': { color: '#E23A22' },
                  }}
                >
                  <IconX
                    size={14}
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      background: theme.palette.secondary.light,
                      opacity: 0.5,
                      zIndex: 999,
                    }}
                    onClick={() => {
                      setOpenRemoveImgModal(true);
                      setObjToRemove(bg);
                    }}
                  />
                </Box>
              )}
            </Box>
          ))
        )}
        <UploadButton for="Background" />
      </Box>
    </>
  );
};

export default BgSectionDetails;
