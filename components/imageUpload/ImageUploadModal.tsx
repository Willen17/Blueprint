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
import { IconCheck, IconChevronRight, IconX } from '@tabler/icons';
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

  console.log(file);

  const backgroundInstructions = [
    { type: 'format', requirement: 'Acceptable file formats: JPG, JPEG, PNG' },
    { type: 'size', requirement: 'File size must not exceed 3 MB' },
  ];

  const posterInstructions = [
    { type: 'format', requirement: 'Acceptable file formats: JPG, JPEG, PNG' },
    { type: 'size', requirement: 'File size must not exceed 2 MB' },
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
                  {file && imageError ? ( // TODO: not correct now
                    <IconX size={12} color="#E23A22" />
                  ) : file && !imageError ? (
                    <IconCheck size={12} color="#3086B7" />
                  ) : (
                    <IconChevronRight size={12} />
                  )}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    maxWidth: 220,
                    color:
                      file && imageError // TODO: not correct now
                        ? '#E23A22'
                        : file && !imageError
                        ? '#3086B7'
                        : 'inherit',
                  }}
                >
                  {instuction.requirement}
                </ListItemText>
              </ListItem>
            ))}
          </List>
          <ImageUploadForm
            onSubmit={() => submit(props.for)}
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
