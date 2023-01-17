import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import { IconChevronRight } from '@tabler/icons';
import { useState } from 'react';

interface Props {
  for: 'Poster' | 'Background';
}

const UploadButton = (props: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleClick = () => {
    if (props.for === 'Background') console.log('upload background');
    if (props.for === 'Poster') setOpenModal(true);
    return;
  };

  const backgroundInstructions = [
    'File should be in XX format 1',
    'File should be in XX format 2',
    'File should be in XX format 3',
    'File should be in XX format 4',
  ];

  const posterInstructions = [
    'File should be in XX format 1',
    'File should be in XX format 2',
    'File should be in XX format 3',
    'File should be in XX format 4',
  ];

  const getInstructions = () => {
    if (props.for === 'Background') return backgroundInstructions;
    if (props.for === 'Poster') return posterInstructions;
  };

  /** Closes modal  */
  const handleClose = () => setOpenModal(false);

  return (
    <>
      <Button
        sx={{ width: 'fit-content', mx: 'auto', mt: 2 }}
        onClick={handleClick}
      >
        Upload Your Own
      </Button>

      {/* Modal */}
      <Modal open={openModal} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            bgcolor: '#fff',
            boxShadow: 24,
          }}
        >
          <Box sx={{ py: 4, textAlign: 'center', width: '100%' }}>
            <Typography component="h3" variant="subtitle2" pb={1}>
              Upload Your Own Poster
            </Typography>
            <List sx={{ m: 'auto', width: 250 }}>
              <Typography
                pb={0.5}
                variant="subtitle1"
                sx={{ textAlign: 'start' }}
              >
                Image requirements:
              </Typography>
              {getInstructions()?.map((instuction, index) => (
                <ListItem key={index} sx={{ m: 'auto', p: 0, height: 18 }}>
                  <ListItemIcon sx={{ minWidth: 20 }}>
                    <IconChevronRight size={12} />
                  </ListItemIcon>
                  <ListItemText sx={{ maxWidth: 220 }}>
                    {instuction}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
            {/* 
            <CardMedia
              component="img"
              onError={onImageError}
              alt="abc"
              image={props.ad.img}
              sx={{ borderRadius: 3, width: 50, height: 50, m: 'auto' }}
            /> */}

            <Button
              onClick={() => console.log('hi millie')}
              sx={{ m: 'auto', mt: 2 }}
            >
              Choose Image
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default UploadButton;
