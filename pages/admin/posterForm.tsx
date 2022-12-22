import {
  Alert,
  Box,
  Button,
  Checkbox,
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
import { ChangeEvent, useEffect, useState } from 'react';

const PosterForm = () => {
  const [file, setFile] = useState<File>();
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
    if (target.files) setFile(target.files[0]);
  }
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
                error={false}
                variant="standard"
              >
                <Button
                  variant="contained"
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
                    onChange={handleChange}
                    multiple
                    type="file"
                  />
                </Button>

                {!file && (
                  <FormHelperText sx={{ textAlign: 'center' }}>
                    Upload an image
                  </FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <TextField
                  id="standard-search"
                  label="Title"
                  helperText="The title for the poster"
                  variant="standard"
                />
              </FormControl>
            </Box>
            <FormControl error={false} variant="standard">
              <FormLabel id="orientation">Orientation</FormLabel>
              <RadioGroup
                aria-labelledby="orientation"
                name="orientation"
                // value={value}
                // onChange={handleRadioChange}
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
              <FormHelperText>What orientation is the poster?</FormHelperText>
            </FormControl>

            <FormControl error={false}>
              <FormLabel id="category">Categories</FormLabel>
              <FormGroup
                aria-label="category"
                sx={{
                  justifyContent: 'flex-start',
                }}
                row
              >
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="Abstract"
                />
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="Animals"
                />
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="Floral"
                />
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="Minimalistic"
                />
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="Movies"
                />
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="Nature"
                />
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="Paintings"
                />
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="Other"
                />
              </FormGroup>
              <FormHelperText sx={{ ml: 0 }}>
                What category is the poster?
              </FormHelperText>
            </FormControl>
            <FormControl error={false}>
              <FormLabel id="size">Sizes (cm)</FormLabel>
              <FormGroup
                aria-label="size"
                sx={{
                  justifyContent: 'flex-start',
                }}
                row
              >
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="21x30"
                />
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="30x40"
                />
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="40x50"
                />
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="50x70"
                />
                <FormControlLabel
                  sx={{ flex: '0 0 10em' }}
                  control={<Checkbox />}
                  label="70x100"
                />
              </FormGroup>
              <FormHelperText sx={{ ml: 0 }}>
                What size is the poster?
              </FormHelperText>
            </FormControl>

            <Button
              variant="contained"
              sx={{ padding: '2 4' }}
              component="label"
            >
              Create poster
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default PosterForm;
