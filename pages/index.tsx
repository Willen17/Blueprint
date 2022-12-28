import { collection, getDocs } from '@firebase/firestore';
import { Container } from '@mui/material';
import { Inter } from '@next/font/google';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import { useSidebar } from '../context/SidebarContext';
import { db, storage } from '../firebase/firebaseConfig';
const Test = dynamic(() => import('../components/canvas/Test'), { ssr: false }); // do not adjust this - M1 mac needs this to run canvas
const inter = Inter({ subsets: ['latin'] });

export default function Home(props: any) {
  const { setAllFrames } = useSidebar();
  const postersCollectionRef = collection(db, 'posters');

  // const getPosters = useCallback(async () => {
  //   const posterData = await getDocs(postersCollectionRef);
  //   console.log(
  //     posterData.docs.map((doc) => ({ ...(doc.data() as any), id: doc.id }))
  //   );
  // }, [postersCollectionRef]);
  // // getPosters();

  useEffect(() => {
    setAllFrames(props.frames);
  }, [props.frames, setAllFrames]);

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
          <Test />
        </Container>
      </main>
    </>
  );
}

export const getStaticProps = async () => {
  const framesCollectionRef = collection(db, 'frames');
  const frameData = await getDocs(framesCollectionRef);
  return {
    props: {
      frames: frameData.docs.map((doc) => ({
        ...(doc.data() as any),
        id: doc.id,
      })),
    },
  };
};
