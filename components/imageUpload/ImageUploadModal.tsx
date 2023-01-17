import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from '@mui/material';
import { IconChevronRight, IconX } from '@tabler/icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpload } from '../../context/UploadContext';
import schemaPoster from '../../lib/valSchemas';
import ImageUploadForm from './ImageUploadForm';

interface Props {
  for: 'Poster' | 'Background';
}

const ImageUploadModal = (props: Props) => {
  const { submit, setOpenUploadModal, openUploadModal, file, setFile } =
    useUpload();
  const [imageError, setImageError] = useState<{ message: string }>();

  /** Closes modal  */
  const handleClose = () => {
    setOpenUploadModal(false);
    setFile(undefined);
  };

  const backgroundInstructions = [
    'Background blah blah blah',
    'File should be in XX format 1',
    'File should be in XX format 2',
    'File should be in XX format 3',
    'File should be in XX format 4',
  ];

  const posterInstructions = [
    'Poster blah blah blah',
    'File should be in XX format 1',
    'File should be in XX format 2',
    'File should be in XX format 3',
    'File should be in XX format 4',
  ];

  const getInstructions = () => {
    if (props.for === 'Background') return backgroundInstructions;
    if (props.for === 'Poster') return posterInstructions;
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<any>({
    mode: 'onChange',
    resolver: yupResolver(schemaPoster),
    defaultValues: {
      title: '',
      categories: [],
      sizes: [],
    },
  });

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
            {getInstructions()?.map((instuction, index) => (
              <ListItem key={index} sx={{ m: 'auto', p: 0, height: 18 }}>
                <ListItemIcon sx={{ minWidth: 20 }}>
                  <IconChevronRight size={12} />
                </ListItemIcon>
                <ListItemText sx={{ maxWidth: 220 }}>{instuction}</ListItemText>
              </ListItem>
            ))}
          </List>
          <ImageUploadForm
            onSubmit={submit}
            register={register}
            formHandleSubmit={handleSubmit}
            errors={errors}
            control={control}
            setFile={setFile}
            file={file}
            setImageError={setImageError}
            imageError={imageError}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageUploadModal;
