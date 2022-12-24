import { AccordionDetails, Box, Button } from '@mui/material';
import { IconCheck } from '@tabler/icons';
import Image from 'next/image';
import { useCanvas } from '../../context/CanvasContext';
import bgLiving from '../../public/tempImages/bg-living.png';
import bgOther from '../../public/tempImages/bg-other.png';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';

const BgSectionDetails = () => {
  const {
    background,
    setBackground,
    setBackgroundCategory,
    backgroundCategory,
  } = useCanvas();

  const handleCategoryChange = (value: string) => {
    backgroundCategory !== value
      ? setBackgroundCategory(value)
      : setBackgroundCategory('');
  };

  // To be deleted after we have inserted frames from data
  const types = ['Living Room', 'Dining Room', 'Bedroom', 'Office', 'Other'];

  // To be deleted after we have inserted frames from data
  const showMeBgs = () => {
    const arr = [];
    for (let i = 0; i <= 100; i++) {
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
    if (backgroundCategory !== '') {
      return showMeBgs().filter((bg) => bg.category === backgroundCategory);
    } else {
      return showMeBgs();
    }
  };

  return (
    <AccordionDetails
      sx={{
        maxWidth: 280,
        minHeight: 'calc(100vh - 200px)',
        maxHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
                backgroundCategory === type ? theme.palette.primary.main : null,
              color:
                backgroundCategory === type
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
        {filteredPosters().map((bg, index) => (
          <Box
            key={index}
            sx={{
              cursor: 'pointer',
              position: 'relative',
              height: 55,
              boxShadow:
                background === index.toString() // TODO: change to ID
                  ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                  : null,
            }}
          >
            <Image
              width={65}
              height={55}
              alt={bg.title} // TODO: change to title
              src={bg.image}
              onClick={() => setBackground(index.toString())}
            />
            {/* TODO: adjust logic - this should not be index but id */}
            {background === index.toString() ? (
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
    </AccordionDetails>
  );
};

export default BgSectionDetails;
