import { Box, Modal, Typography } from '@mui/material';
import { IconX } from '@tabler/icons';
import { useSave } from '../../context/SaveContext';

const SaveModal = () => {
  const { openSaveModal, setOpenSaveModal, setOpenLogoModal } = useSave();

  return (
    <Modal open={openSaveModal}>
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
            onClick={() => {
              setOpenSaveModal(false), setOpenLogoModal(false);
            }}
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
              cursor: 'pointer',
            }}
          />
          <Typography component="h3" variant="subtitle2" pb={1}>
            Save my canvas
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default SaveModal;
