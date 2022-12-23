import { Box, Button } from '@mui/material';
import { IconCheck } from '@tabler/icons';
import Image from 'next/image';
import { useState } from 'react';
import bgLiving from '../../public/tempImages/bg-living.png';
import bgOther from '../../public/tempImages/bg-other.png';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';

const BgSection = () => {
  const [selectedBg, setSelectedBg] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const handleCategoryChange = (value: string) => {
    selectedCategory !== value
      ? setSelectedCategory(value)
      : setSelectedCategory('');
  };

  // To be deleted after we have inserted frames from data
  const types = ['Living Room', 'Dining Room', 'Bedroom', 'Office', 'Other'];

  // To be deleted after we have inserted frames from data
  const showMeBgs = () => {
    const arr = [];
    for (let i = 0; i <= 10; i++) {
      arr.push(
        {
          title: 'B1',
          image: bgLiving,
          category: 'Living Room',
        },
        {
          title: 'B2',
          image: bgOther,
          category: 'Other',
        }
      );
      i++;
    }
    return arr;
  };

  // DO NOT delete the below function
  /** Filters backgrounds by category */
  const filteredPosters = () => {
    if (selectedCategory !== '') {
      return showMeBgs().filter((bg) => bg.category === selectedCategory);
    } else {
      return showMeBgs();
    }
  };

  return (
    <Box sx={{ maxWidth: 280, px: 3, pb: 2 }}>
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
          overflowY: 'scroll',
        }}
      >
        {filteredPosters().map((bg, index) => (
          <Box
            key={index}
            sx={{
              cursor: 'pointer',
              position: 'relative',
              height: 55,
              boxShadow:
                selectedBg === index.toString() // TODO: change to ID
                  ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                  : null,
            }}
          >
            <Image
              width={65}
              height={55}
              alt={bg.title} // TODO: change to title
              src={bg.image}
              onClick={() => setSelectedBg(index.toString())}
            />
            {/* TODO: adjust logic - this should not be index but id */}
            {selectedBg === index.toString() ? (
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

export default BgSection;
