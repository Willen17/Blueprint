import { Box, Button, Typography, useMediaQuery } from '@mui/material';
import { IconCheck, IconRectangle, IconRectangleVertical } from '@tabler/icons';
import { isEqual } from 'lodash';
import Image from 'next/image';
import { useCanvas } from '../../context/CanvasContext';
import { useSidebar } from '../../context/SidebarContext';
import { frameDimensions } from '../../data/frameData';
import { posterCategories as pCategories } from '../../lib/valSchemas';
import UploadButton from '../imageUpload/UploadButton';
import SidebarSubtitle from '../shared/SidebarSubtitle';
import { theme } from '../theme';
import { Dimension } from '../types';

const PosterSectionDetails = () => {
  const {
    allPosters,
    posterCategories,
    setPosterCategories,
    setAnchorSidebar,
    isEditingFrame,
    poster,
    setPoster,
    posterOrientation,
    setPosterOrientation,
    frameSet,
    setIsEditingFrame,
  } = useSidebar();
  const { updateItem } = useCanvas();
  const mobile = useMediaQuery(theme.breakpoints.down(800));

  /** Handles change of orientation state */
  const handleOrientationChange = (value: string) => {
    posterOrientation !== value
      ? setPosterOrientation(value)
      : setPosterOrientation('');
  };

  /** Handles selection of one or multiple poster categories */
  const setCategory = (category: string) => {
    let newFilter = { ...posterCategories };
    for (let key in newFilter) {
      if (key === category) {
        newFilter[key as keyof typeof posterCategories] =
          !posterCategories[key as keyof typeof posterCategories];
      }
    }
    setPosterCategories(newFilter);
  };

  /** Filters posters by selected orientation and category */
  const filteredPosters = () => {
    let sizeKey: string;
    !frameSet.size
      ? (sizeKey = isEditingFrame.item!.frame.size)
      : (sizeKey = frameSet.size);

    const noCategory = Object.values(posterCategories).every(
      (v) => v === false
    );
    const filteredBySize = allPosters.flatMap((poster) =>
      poster.sizes
        .filter(
          (size: Dimension) =>
            Number(size.width) ===
              frameDimensions[sizeKey as keyof typeof frameDimensions].width &&
            Number(size.height) ===
              frameDimensions[sizeKey as keyof typeof frameDimensions].height
        )
        .map(() => poster)
    );
    const filteredByCategory = filteredBySize.filter((item) => {
      return Object.keys(posterCategories).some((category) => {
        return (
          posterCategories[category as keyof typeof posterCategories] &&
          item.categories.includes(category)
        );
      });
    });

    if (posterOrientation.length > 0) {
      let list = [];
      noCategory ? (list = filteredBySize) : (list = filteredByCategory);
      return list.filter((poster) => poster.orientation === posterOrientation);
    }
    return noCategory ? filteredBySize : filteredByCategory;
  };

  return (
    <>
      {isEditingFrame.item || (frameSet.id && frameSet.size) ? (
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
            {pCategories.map((category: string, index: number) => (
              <Button
                key={index}
                value={category}
                sx={{
                  bgcolor: posterCategories[
                    category as keyof typeof posterCategories
                  ]
                    ? theme.palette.primary.main
                    : null,
                  color: posterCategories[
                    category as keyof typeof posterCategories
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
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1.5,
              width: '100%',
              placeContent: 'start',
              justifyContent: 'center',
              my: 2.5,
              height: '100%',
              overflowY: !mobile ? 'scroll' : null,
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
                    poster.id === p.id
                      ? '0px 2px 5px rgba(0, 0, 0, 0.25)'
                      : null,
                }}
              >
                <Image
                  width={p.orientation === 'Portrait' ? 55 : 65}
                  height={p.orientation === 'Portrait' ? 65 : 55}
                  alt={p.title}
                  src={p.image}
                  onClick={() => {
                    isEditingFrame.item?.poster.id
                      ? (updateItem({
                          frame: isEqual(frameSet, {
                            id: '',
                            title: '',
                            size: '',
                          })
                            ? isEditingFrame.item.frame
                            : frameSet,
                          id: isEditingFrame.item.id,
                          position: isEditingFrame.item.position,
                          poster: {
                            id: p.id!,
                            image: p.image,
                            isPortrait:
                              p.orientation === 'Portrait' ? true : false,
                            sizes: p.sizes,
                          },
                          withPassepartout:
                            isEditingFrame.item.withPassepartout,
                        }),
                        setIsEditingFrame({
                          ...isEditingFrame,
                          item: {
                            frame: isEqual(frameSet, {
                              id: '',
                              title: '',
                              size: '',
                            })
                              ? isEditingFrame.item.frame
                              : frameSet,
                            id: isEditingFrame.item.id,
                            position: isEditingFrame.item.position,
                            poster: {
                              id: p.id!,
                              image: p.image,
                              isPortrait:
                                p.orientation === 'Portrait' ? true : false,
                              sizes: p.sizes,
                            },
                            withPassepartout:
                              isEditingFrame.item.withPassepartout,
                          },
                        }))
                      : (setPoster({
                          id: p.id!,
                          image: p.image,
                          isPortrait:
                            p.orientation === 'Portrait' ? true : false,
                          sizes: p.sizes,
                        }),
                        setAnchorSidebar(false));
                  }}
                />
                {(isEditingFrame.item &&
                  isEditingFrame.item.poster.id === p.id) ||
                poster.id === p.id ? (
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
            <UploadButton for="Poster" />
          </Box>
        </>
      ) : (
        <>
          <Typography mt={3} width={180} mx="auto" textAlign="center">
            The posters will appear here after selecting a frame.
          </Typography>
          <UploadButton for="Poster" />
        </>
      )}
    </>
  );
};

export default PosterSectionDetails;
