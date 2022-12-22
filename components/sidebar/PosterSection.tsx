import { Box, Button } from '@mui/material';
import { IconCheck, IconRectangle, IconRectangleVertical } from '@tabler/icons';
import Image from 'next/image';
import { useState } from 'react';
import posterL from '../../public/tempImages/poster-l.png';
import posterP from '../../public/tempImages/poster-p.png';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';

const PosterSection = () => {
  const [selectedOrientation, setSelectedOrientation] = useState<string>('');
  const [selectedPoster, setSelectedPoster] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleOrientationChange = (value: string) => {
    selectedOrientation !== value
      ? setSelectedOrientation(value)
      : setSelectedOrientation('');
  };

  const handleCategoryChange = (value: string) => {
    selectedCategory !== value
      ? setSelectedCategory(value)
      : setSelectedCategory('');
  };

  // To be deleted after we have inserted frames from data
  const types = [
    'Abstract',
    'Animals',
    'Floral',
    'Minimalistic',
    'Movies',
    'Nature',
    'Paintings',
    'Other',
  ];

  // To be deleted after we have inserted frames from data
  const showMePosters = () => {
    const arr = [];
    for (let i = 0; i <= 10; i++) {
      arr.push(
        {
          title: 'P1',
          src: posterP,
          orientation: 'Portrait',
          category: 'Abstract',
        },
        {
          title: 'P2',
          src: posterL,
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
    if (selectedOrientation !== '' && selectedCategory !== '') {
      return showMePosters().filter(
        (poster) =>
          poster.orientation === selectedOrientation &&
          poster.category === selectedCategory
      );
    } else if (selectedCategory !== '') {
      return showMePosters().filter(
        (poster) => poster.category === selectedCategory
      );
    } else if (selectedOrientation !== '') {
      return showMePosters().filter(
        (poster) => poster.orientation === selectedOrientation
      );
    } else {
      return showMePosters();
    }
  };

  return (
    <Box sx={{ maxWidth: 280, px: 3, pb: 2 }}>
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
              selectedOrientation === 'Portrait'
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
              selectedOrientation === 'Landscape'
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
        {types.map((type, index) => (
          <Button
            key={index}
            value={type}
            sx={{
              bgcolor:
                selectedCategory === type ? theme.palette.primary.main : null,
              color:
                selectedCategory === type
                  ? theme.palette.primary.contrastText
                  : null,
            }}
            onClick={() => handleCategoryChange(type)}
          >
            {type}
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
          my: 2,
          maxHeight: 250,
          overflow: 'scroll',
        }}
      >
        {filteredPosters().map((poster, index) => (
          <Box
            key={index}
            sx={{
              cursor: 'pointer',
              position: 'relative',
              height: poster.orientation === 'Portrait' ? 65 : 55,
              boxShadow:
                selectedPoster === index.toString() // TODO: change to ID
                  ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                  : null,
            }}
          >
            <Image
              width={poster.orientation === 'Portrait' ? 55 : 65}
              height={poster.orientation === 'Portrait' ? 65 : 55}
              alt={poster.title} // TODO: change to title
              src={poster.src}
              onClick={() => setSelectedPoster(index.toString())}
            />
            {/* TODO: adjust logic - this should not be index but id */}
            {selectedPoster === index.toString() ? (
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
    </Box>
  );
};

export default PosterSection;
