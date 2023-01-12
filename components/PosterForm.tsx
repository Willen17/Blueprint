import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import Image from 'next/image';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { posterCategories, PosterData, posterSizes } from '../lib/valSchemas';
import PosterCheckBox from './PosterCheckBox';

interface CreatePosterData {
  onSubmit: (data: PosterData) => void;
  register: UseFormRegister<PosterData>;
  formHandleSubmit: UseFormHandleSubmit<PosterData>;
  errors: Partial<FieldErrorsImpl<PosterData>>;
  control: Control<PosterData>;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  file: File | undefined;
  setImageError: Dispatch<
    SetStateAction<
      | {
          message: string;
        }
      | undefined
    >
  >;
  imageError:
    | {
        message: string;
      }
    | undefined;
}

const PosterForm = ({
  onSubmit,
  formHandleSubmit,
  errors,
  control,
  setFile,
  file,
  setImageError,
  imageError,
}: CreatePosterData) => {
  const [preview, setPreview] = useState<string>();

  // create a preview whenever file is changed
  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  function handleChange(event: ChangeEvent) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const currentFile = target.files[0];
      // validate file size
      if (currentFile.size > 5000000)
        return setImageError({ message: 'Image size should be less than 5mb' });
      // validate if file is image file
      if (!isImageFile(currentFile))
        return setImageError({
          message: 'Only image file formats are allowed',
        });
      setImageError(undefined);
      return setFile(currentFile);
    }
  }

  const isImageFile = (file: File) => {
    const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    return file && acceptedImageTypes.includes(file['type']);
  };

  return (
    <>
      <Head>
        <title>Admin - Poster Form | Blue print | Visualize your frames</title>
        <meta name="description" content="Post your posters to the database" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          padding: 4,
          rowGap: 3,
        }}
      >
        <Box>
          <Typography variant="h5" component="h1" sx={{ textAlign: 'center' }}>
            Create a poster
          </Typography>
        </Box>
        <Paper elevation={3} sx={{ maxWidth: 600, m: 'auto' }}>
          <Box
            component="form"
            onSubmit={formHandleSubmit(onSubmit)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: 3,
              padding: 5,
            }}
          >
            <Alert severity="info" sx={{ fontSize: 11 }}>
              Here you can add posters to the database. All posters uploaded
              will be added to the database and visible for all of our users.
            </Alert>
            <Box sx={{ mt: 5 }}>
              {file && preview && (
                <Box sx={{ mb: 2 }}>
                  <Image
                    src={preview}
                    alt={file.name}
                    height={100}
                    width={100}
                    style={{
                      objectFit: 'cover',
                      alignSelf: 'center',
                      marginRight: 10,
                    }}
                  />
                  <Typography variant="subtitle2">{file.name}</Typography>
                </Box>
              )}
              <FormControl
                sx={{
                  display: file && 'flex',
                  flexDirection: file && 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  gap: 2,
                }}
                error={Boolean(imageError)}
                variant="standard"
              >
                <Button
                  sx={{
                    padding: '2 4',
                    flex: file && '0 0 10em',
                    mr: file && 2,
                    maxWidth: 100,
                  }}
                  component="label"
                >
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    type="file"
                  />
                </Button>

                <FormHelperText sx={{ textAlign: 'center' }}>
                  {imageError ? imageError.message : !file && 'Upload an image'}
                </FormHelperText>
              </FormControl>
            </Box>
            <Box>
              <Controller
                name="title"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormControl error={Boolean(errors.title)}>
                    <TextField
                      label="Title"
                      {...field}
                      error={Boolean(errors.title)}
                      variant="standard"
                    />
                    <FormHelperText sx={{ ml: 0 }}>
                      {errors.title
                        ? errors.title.message
                        : 'The title for the poster'}
                    </FormHelperText>
                  </FormControl>
                )}
              />
            </Box>
            <Controller
              control={control}
              name="orientation"
              defaultValue=""
              render={({ field }) => (
                <FormControl error={Boolean(errors.orientation)}>
                  <FormLabel id="orientation">Orientation</FormLabel>
                  <RadioGroup
                    aria-labelledby="orientation"
                    {...field}
                    sx={{ justifyContent: 'flex-start', columnGap: 10 }}
                    row
                  >
                    <FormControlLabel
                      value="Portrait"
                      id="Portrait"
                      control={<Radio aria-labelledby="Portrait" />}
                      label="Portrait"
                    />
                    <FormControlLabel
                      value="Landscape"
                      id="Landscape"
                      control={<Radio aria-labelledby="Landscape" />}
                      label="Landscape"
                    />
                  </RadioGroup>
                  <FormHelperText sx={{ ml: 0 }}>
                    {errors.orientation
                      ? errors.orientation.message
                      : 'What orientation is the poster?'}
                  </FormHelperText>
                </FormControl>
              )}
            />
            <FormControl error={Boolean(errors.categories)}>
              <FormLabel id="categories">Categories</FormLabel>
              <FormGroup
                aria-label="categories"
                sx={{ justifyContent: 'flex-start' }}
                row
              >
                <PosterCheckBox
                  categories={posterCategories}
                  name="categories"
                  control={control}
                />
              </FormGroup>
              <FormHelperText sx={{ ml: 0 }}>
                {errors.categories
                  ? errors.categories.message
                  : 'What categories is the poster?'}
              </FormHelperText>
            </FormControl>
            <FormControl error={Boolean(errors.sizes)}>
              <FormLabel id="sizes">Size (cm)</FormLabel>
              <FormGroup
                aria-label="sizes"
                sx={{
                  justifyContent: 'flex-start',
                }}
                row
              >
                <PosterCheckBox
                  sizes={posterSizes}
                  name="sizes"
                  control={control}
                />
              </FormGroup>
              <FormHelperText sx={{ ml: 0 }}>
                {errors.sizes
                  ? errors.sizes.message
                  : 'What sizes is the poster?'}
              </FormHelperText>
            </FormControl>
            <Button type="submit" sx={{ padding: '2 4' }}>
              Create poster
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PosterForm;
