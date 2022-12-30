import { Box, Button } from '@mui/material';
import { IconCheck } from '@tabler/icons';
import Image from 'next/image';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { backgroundCategories as bgCategories } from '../../lib/valSchemas';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';

const BgSectionDetails = () => {
  const { background, setBackground } = useCanvas();
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

  const filteredItems = allBackgrounds.filter((item) => {
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
            {category}
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
          overflowY: 'scroll',

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
        {noCategory
          ? allBackgrounds.map((bg, index) => (
              <Box
                key={index}
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  height: 55,
                  boxShadow:
                    background === bg.image
                      ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                      : null,
                }}
              >
                <Image
                  width={65}
                  height={55}
                  alt={bg.title}
                  src={bg.image}
                  onClick={() => setBackground(bg.image)}
                />
                {background === bg.image ? (
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
          : filteredItems.map((bg, index) => (
              <Box
                key={index}
                sx={{
                  cursor: 'pointer',
                  position: 'relative',
                  height: 55,
                  boxShadow:
                    background === bg.image
                      ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                      : null,
                }}
              >
                <Image
                  width={65}
                  height={55}
                  alt={bg.title}
                  src={bg.image}
                  onClick={() => setBackground(bg.image)}
                />
                {background === bg.image ? (
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
            ))}
      </Box>
    </>
  );
};

export default BgSectionDetails;
