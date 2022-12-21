import { collection, getDocs } from '@firebase/firestore';
import { Box, Button, Container, Typography } from '@mui/material';
import { Inter } from '@next/font/google';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import { auth, db, storage } from '../firebase/firebaseConfig';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const postersCollectionRef = collection(db, 'posters');

  const getPosters = useCallback(async () => {
    const posterData = await getDocs(postersCollectionRef);
    console.log(
      posterData.docs.map((doc) => ({ ...(doc.data() as any), id: doc.id }))
    );
  }, [postersCollectionRef]);
  // getPosters();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

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
          //    navigate('/');
          //    toast.success('din annons har nu publicerats.', {
          //      position: toast.POSITION.BOTTOM_CENTER,
          //    });
        })
        .catch((error) => {
          //    toast.warning(error, { position: toast.POSITION.BOTTOM_CENTER });
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
          <Button onClick={handleGoogleSignIn}>SIGN IN!</Button>

          <Box>
            <input type="file" accept="image/*" onChange={handleChange} />
            <Button onClick={handleUpload}>Upload to Firebase</Button>
            <Typography>{percent}%</Typography>
          </Box>
        </Container>
      </main>
    </>
  );
}
