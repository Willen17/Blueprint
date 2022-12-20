import { collection, getDocs } from '@firebase/firestore';
import { Container, Typography } from '@mui/material';
import { Inter } from '@next/font/google';
import Head from 'next/head';
import { useCallback } from 'react';
import { db } from '../firebase';
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const postersCollectionRef = collection(db, 'posters');

  const getPosters = useCallback(async () => {
    const posterData = await getDocs(postersCollectionRef);
    console.log(
      posterData.docs.map((doc) => ({ ...(doc.data() as any), id: doc.id }))
    );
  }, []);

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
        </Container>
      </main>
    </>
  );
}
