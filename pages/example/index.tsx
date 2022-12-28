import { collection } from '@firebase/firestore';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Radio,
  Switch,
  Typography,
} from '@mui/material';
import { Inter } from '@next/font/google';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import PlainBlack from '../../components/frames/PlainBlack';
import PlainMaple from '../../components/frames/PlainMaple';
import PlainWalnut from '../../components/frames/PlainWalnut';
import PlainWhite from '../../components/frames/PlainWhite';
import { frameDimensions } from '../../data/frameData';
import { db, storage } from '../../firebase/firebaseConfig';
const inter = Inter({ subsets: ['latin'] });

export default function Home(props: any) {
  const postersCollectionRef = collection(db, 'posters');

  // const getPosters = useCallback(async () => {
  //   const posterData = await getDocs(postersCollectionRef);
  //   console.log(
  //     posterData.docs.map((doc) => ({ ...(doc.data() as any), id: doc.id }))
  //   );
  // }, [postersCollectionRef]);
  // // getPosters();

  const [file, setFile] = useState<any>('');
  const [percent, setPercent] = useState<number>(0);

  // Handles input change event and updates state
  function handleChange(event: any) {
    setFile(event.target.files[0]);
  }

  function handleUpload() {
    if (!file) alert('Please choose a file first!');
    const storageRef = ref(storage, `/posters/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.log(err),
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((url) => addPoster(url))
    );
  }

  const addPoster = useCallback(
    async (url: string) => {
      const newPoster = {
        category: 'Animals',
        createdAt: serverTimestamp(),
        sizes: [
          { width: 70, height: 50 },
          { width: 40, height: 30 },
          { width: 100, height: 70 },
        ],
        title: 'Kapten Krok',
        orientation: 'Landscape',
        image: url,
      };
      await addDoc(postersCollectionRef, newPoster)
        .then(() => {
          setPercent(0);
          // TODO: add more actions eg toast, navigate etc
        })
        .catch((error) => {
          console.log(error, error.code); // TODO: add action
        });
    },
    [postersCollectionRef]
  );

  return (
    <>
      <Head>
        <title>Blue print | Visualize your frames</title>
        <meta name="description" content="Visualize your frames" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Typography>Welcome to Blue print</Typography>
          <Typography variant="h1">This is H1</Typography>
          <Typography variant="h2">This is H2</Typography>
          <Typography variant="subtitle1">This is subtitle1</Typography>
          <Typography variant="body1">This is body1</Typography>
          <Typography variant="body2">This is body2</Typography>
          <Button>Button</Button>
          <Checkbox size="small" />
          <Switch />
          <Radio size="small" />
          <Box>
            <input type="file" accept="image/*" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload to Firebase</Button>
            <Typography>{percent}%</Typography>
          </Box>

          <Box display="flex" gap={3} sx={{ flexWrap: 'wrap' }}>
            <PlainWhite size={frameDimensions.xs} />
            <PlainBlack size={frameDimensions.sm} />
            <PlainWalnut size={frameDimensions.md} />
            <PlainMaple size={frameDimensions.lg} />
            <PlainWalnut size={frameDimensions.xl} />
          </Box>
        </Container>
      </main>
    </>
  );
}
