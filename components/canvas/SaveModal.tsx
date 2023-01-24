import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { IconX } from '@tabler/icons';
import { useEffect, useState } from 'react';
import { useCanvas } from '../../context/CanvasContext';
import { useSave } from '../../context/SaveContext';

const SaveModal = () => {
  const {
    openSaveModal,
    setOpenSaveModal,
    setOpenLogoModal,
    saveCanvasToDataBase,
  } = useSave();
  const { canvas } = useCanvas();
  const [title, setTitle] = useState<string>(canvas.title || '');
  const [valError, setValError] = useState<{ message: string } | undefined>();
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (title) {
      if (title.length < 2 || title.length > 20)
        setValError({ message: 'Must be between 2 and 20 characters' });
      else setValError(undefined);
    }
  }, [title]);

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
          {!canvas.title && (
            <>
              <Typography component="h3" variant="subtitle2" pb={1}>
                Please name your canvas
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <FormControl
                  error={valError !== undefined}
                  sx={{ minWidth: 200, maxWidth: 200 }}
                >
                  <TextField
                    sx={{ minWidth: 200, maxWidth: 200 }}
                    label="Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setTouched(true);
                    }}
                    error={valError !== undefined}
                    variant="standard"
                  />
                  <FormHelperText sx={{ ml: 0 }}>
                    {valError && (
                      <Typography variant="body2">
                        {valError.message}
                      </Typography>
                    )}
                  </FormHelperText>
                </FormControl>
                <Button
                  disabled={!touched || valError !== undefined}
                  sx={{ padding: '2 4' }}
                  onClick={() => saveCanvasToDataBase(title)}
                >
                  Save canvas
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default SaveModal;
