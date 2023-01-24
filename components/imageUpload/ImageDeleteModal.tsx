import { Box, Button, Modal, Typography } from '@mui/material';
import { IconX } from '@tabler/icons';
import Image from 'next/image';
import { useSidebar } from '../../context/SidebarContext';
import { theme } from '../theme';

const ImageDeleteModal = () => {
  const {
    removeUploadedObj,
    openRemoveImgModal,
    setOpenRemoveImgModal,
    setObjToRemove,
    objToRemove,
  } = useSidebar();

  const handleClose = () => {
    setObjToRemove(undefined);
    setOpenRemoveImgModal(false);
  };

  return objToRemove ? (
    <Modal open={openRemoveImgModal} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: '#fff',
          boxShadow: 24,
          outline: 'none',
          maxHeight: '70%',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': { width: '0.4em' },
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
        <Box
          sx={{
            py: 4,
            textAlign: 'center',
            width: '100%',
            position: 'relative',
          }}
        >
          <IconX
            size={20}
            onClick={handleClose}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              cursor: 'pointer',
            }}
          />
          <Typography component="h3" variant="subtitle2">
            Are you sure to delete the image?
          </Typography>
          <Typography variant="body2" pb={2}>
            This action cannot be undone.
          </Typography>
          <Box
            width={70}
            height={70}
            sx={{ boxSizing: 'border-box', position: 'relative', m: 'auto' }}
          >
            <Image
              fill
              alt={objToRemove.title}
              src={objToRemove.image}
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Box
            pt={2}
            sx={{ display: 'flex', justifyContent: 'center', columnGap: 1 }}
          >
            <Button
              onClick={removeUploadedObj}
              sx={{
                '&:hover': {
                  bgcolor: '#E23A22',
                  color: theme.palette.primary.contrastText,
                },
              }}
            >
              Confirm
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  ) : null;
};

export default ImageDeleteModal;
