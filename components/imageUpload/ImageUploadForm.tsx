import { Box, Button, FormControl, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect } from 'react';
import { CreateImageData, useUpload } from '../../context/UploadContext';
import { theme } from '../theme';

const ImageUploadForm = ({
  onSubmit,
  formHandleSubmit,
  file,
  imageError,
}: CreateImageData) => {
  const { preview, setPreview, handleImageChange } = useUpload();

  // create a preview whenever file is changed
  useEffect(() => {
    if (!file) return setPreview(undefined);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file, setPreview]);

  return (
    <Box
      component="form"
      onSubmit={formHandleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <FormControl
        sx={{ py: 1 }}
        error={Boolean(imageError)}
        variant="standard"
      >
        {file && preview && (
          <Box sx={{ my: 2 }}>
            <Image width={80} height={80} alt={file.name} src={preview} />
            <Typography variant="body2">{file.name}</Typography>
          </Box>
        )}

        <Box>
          <Button component="label">
            {file ? 'Change Image' : 'Choose Image'}
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(event) => handleImageChange(event)}
            />
          </Button>
          {file && preview && (
            <Button
              type="submit"
              sx={{
                ml: 2,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                '&:hover': {
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                },
              }}
            >
              Upload
            </Button>
          )}
        </Box>
      </FormControl>
    </Box>
  );
};

export default ImageUploadForm;
