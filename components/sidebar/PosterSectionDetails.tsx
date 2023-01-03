import { Box, Button } from '@mui/material';
import { IconCheck, IconRectangle, IconRectangleVertical } from '@tabler/icons';
import Image from 'next/image';
import { Key } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { posterCategories } from '../../lib/valSchemas';
import posterL from '../../public/tempImages/poster-l.png';
import posterP from '../../public/tempImages/poster-p.png';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';

const PosterSectionDetails = () => {
  const { poster, setPoster, posterOrientation, setPosterOrientation } =
    useCanvas();
  const { posterCategory, setPosterCategory } = useSidebar();

  const handleOrientationChange = (value: string) => {
    posterOrientation !== value
      ? setPosterOrientation(value)
      : setPosterOrientation('');
  };

  const handleCategoryChange = (value: string) => {
    posterCategory !== value ? setPosterCategory(value) : setPosterCategory('');
  };

  // To be deleted after we have inserted frames from data
  const showMePosters = () => {
    const arr = [];
    for (let i = 0; i <= 50; i++) {
      arr.push(
        {
          title: 'P1',
          image: posterP,
          orientation: 'Portrait',
          category: 'Abstract',
        },
        {
          title: 'P2',
          image: posterL,
          orientation: 'Landscape',
          category: 'Movies',
        }
      );
      i++;
    }
    return arr;
  };

  // DO NOT delete the below function
  /** Filters posters by selected orientation and category */
  const filteredPosters = () => {
    if (posterOrientation !== '' && posterCategory !== '') {
      return showMePosters().filter(
        (poster) =>
          poster.orientation === posterOrientation &&
          poster.category === posterCategory
      );
    } else if (posterCategory !== '') {
      return showMePosters().filter(
        (poster) => poster.category === posterCategory
      );
    } else if (posterOrientation !== '') {
      return showMePosters().filter(
        (poster) => poster.orientation === posterOrientation
      );
    } else {
      return showMePosters();
    }
  };

  return (
    <>
      <SidebarSubtitle subtitle="Poster Type">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            placeItems: 'center',
            gap: 0.5,
          }}
        >
          <IconRectangleVertical
            stroke={1.3}
            fill={
              posterOrientation === 'Portrait'
                ? theme.palette.primary.main
                : 'none'
            }
            onClick={() => handleOrientationChange('Portrait')}
            style={{ cursor: 'pointer' }}
          />
          <IconRectangle
            stroke={1.3}
            onClick={() => handleOrientationChange('Landscape')}
            fill={
              posterOrientation === 'Landscape'
                ? theme.palette.primary.main
                : 'none'
            }
            style={{ cursor: 'pointer' }}
          />
        </Box>
      </SidebarSubtitle>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {posterCategories.map((category: string, index: Key) => (
          <Button
            key={index}
            value={category}
            sx={{
              bgcolor:
                posterCategory === category ? theme.palette.primary.main : null,
              color:
                posterCategory === category
                  ? theme.palette.primary.contrastText
                  : null,
            }}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </Button>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          width: '100%',
          justifyContent: 'center',
          my: 2.5,
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
        {filteredPosters().map((p, index) => (
          <Box
            key={index}
            sx={{
              cursor: 'pointer',
              position: 'relative',
              height: p.orientation === 'Portrait' ? 65 : 55,
              boxShadow:
                poster.id === index.toString() // TODO: change to ID
                  ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                  : null,
            }}
          >
            <Image
              width={p.orientation === 'Portrait' ? 55 : 65}
              height={p.orientation === 'Portrait' ? 65 : 55}
              alt={p.title} // TODO: change to title
              src={p.image}
              onClick={() => setPoster({ ...poster, id: index.toString() })}
            />
            {/* TODO: adjust logic - this should not be index but id */}
            {poster.id === index.toString() ? (
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

export default PosterSectionDetails;
