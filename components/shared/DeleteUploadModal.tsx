import { Box, Button, Modal, Typography } from '@mui/material';
import { IconX } from '@tabler/icons';
import Image from 'next/image';
import { useSidebar } from '../../context/SidebarContext';

const DeleteUploadModal = () => {
  const {
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
            Are you sure to delete this image?
          </Typography>
          <Typography variant="body2" pb={1}>
            This action cannot be undone.
          </Typography>
          <Box
            width={50}
            height={50}
            sx={{ boxSizing: 'border-box', position: 'relative' }}
          >
            <Image
              fill
              alt={objToRemove.title}
              src={objToRemove.image}

              // alt={objToRemove ? objToRemove?.title : 'no error damn you'}
              // src={objToRemove ? objToRemove?.image : 'no error damn you'}
            />
          </Box>
          <Box>
            <Button>Confirm</Button>
            <Button>Cancel</Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  ) : null;
};

export default DeleteUploadModal;
