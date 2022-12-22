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
import {
  Control,
  Controller,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';
import { categories, PosterData, posterSizes } from '../lib/valSchemas';
import FormCheckBox from './FormCheckBox';

interface CreatePosterData {
  onSubmit: (data: PosterData) => void;
  register: UseFormRegister<PosterData>;
  formHandleSubmit: UseFormHandleSubmit<PosterData>;
  errors: Partial<FieldErrorsImpl<PosterData>>;
  control: Control<PosterData>;
}

const PosterForm = ({
  onSubmit,
  formHandleSubmit,
  register,
  errors,
  control,
}: CreatePosterData) => {
  return (
    <>
      <Head>
        <title>Admin - Poster form</title>
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
          <Typography variant="h3" sx={{ ml: 5 }}>
            Create a poster
          </Typography>
        </Box>
        <Paper elevation={3}>
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
            <Alert severity="info">
              Here you can add posters to the database. All posters uploaded
              will be added to the database and visible for all of our users.
            </Alert>
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
                    />
                    <FormHelperText>
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
                  <RadioGroup aria-labelledby="orientation" {...field}>
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
                sx={{
                  justifyContent: 'flex-start',
                }}
                row
              >
                <FormCheckBox
                  options={categories}
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
                <FormCheckBox
                  options={posterSizes}
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
            <Button type="submit" variant="contained" sx={{ padding: '2 4' }}>
              Create poster
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PosterForm;
