import { Box, Button, FormControl, Typography } from '@mui/material';
import Image from 'next/image';
import { useUpload } from '../../context/UploadContext';
import { theme } from '../theme';

const ImageUploadForm = () => {
  const {
    preview,
    setPreview,
    handleImageChange,
    file,
    imageError,
    submit,
    uploadOption,
  } = useUpload();

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      sx={{ display: 'flex', flexDirection: 'column' }}
    >
      <FormControl
        sx={{ py: 1 }}
        error={Boolean(imageError)}
        variant="standard"
      >
        {file && preview && (
          <Box sx={{ my: 2 }}>
            <Box
              width={80}
              height={80}
              sx={{ position: 'relative', m: 'auto' }}
            >
              <Image
                fill
                sizes="100%"
                alt={file.name}
                src={preview}
                onError={() => setPreview('/otherImages/broken-img.jpg')}
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Typography variant="body2" mt={0.5}>
              {file.name}
            </Typography>
          </Box>
        )}

        <Box>
          <Button component="label">
            {file ? 'Change Image' : 'Choose Image'}
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e)}
            />
          </Button>
          {file && imageError.length < 1 && preview && (
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
