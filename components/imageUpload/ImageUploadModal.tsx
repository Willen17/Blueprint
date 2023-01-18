import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import { IconCheck, IconChevronRight, IconX } from '@tabler/icons';
import { useUpload } from '../../context/UploadContext';
import ImageUploadForm from './ImageUploadForm';

interface Props {
  for: 'Poster' | 'Background';
}

const ImageUploadModal = (props: Props) => {
  const {
    setOpenUploadModal,
    openUploadModal,
    file,
    setFile,
    imageError,
    setImageError,
  } = useUpload();

  /* Closes modal  */
  const handleClose = () => {
    setOpenUploadModal(false);
    setFile(undefined);
    setImageError(undefined);
  };

  const backgroundInstructions = [
    { type: 'format', requirement: 'Acceptable file formats: JPG, JPEG, PNG' },
    { type: 'size', requirement: 'File size must not exceed 3 MB' },
  ];

  const posterInstructions = [
    { type: 'format', requirement: 'Acceptable file formats: JPG, JPEG, PNG' },
    { type: 'size', requirement: 'File size must not exceed 3 MB' },
  ];

  /* Check props and display the correct instuctions */
  const getInstructions = () => {
    if (props.for === 'Background') return backgroundInstructions;
    if (props.for === 'Poster') return posterInstructions;
  };

  return (
    <Modal open={openUploadModal}>
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
          <Typography component="h3" variant="subtitle2" pb={1}>
            Upload Your Own {props.for}
          </Typography>
          <List sx={{ m: 'auto', width: 250 }}>
            <Typography
              pb={0.5}
              variant="subtitle1"
              sx={{ textAlign: 'start' }}
            >
              Image requirements:
            </Typography>
            {getInstructions()?.map((instruction, index) => (
              <ListItem key={index} sx={{ m: 'auto', p: 0, height: 18 }}>
                <ListItemIcon sx={{ minWidth: 20 }}>
                  {file && imageError?.includes(instruction.type) ? (
                    <IconX size={12} color="#E23A22" />
                  ) : (file && !imageError) ||
                    (file && imageError?.indexOf(instruction.type) === -1) ? (
                    <IconCheck size={12} color="#3086B7" />
                  ) : (
                    <IconChevronRight size={12} />
                  )}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    maxWidth: 220,
                    color:
                      file && imageError?.includes(instruction.type)
                        ? '#E23A22'
                        : file && imageError?.indexOf(instruction.type) === -1
                        ? '#3086B7'
                        : 'inherit',
                  }}
                >
                  {instruction.requirement}
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <ImageUploadForm for={props.for} />
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageUploadModal;
