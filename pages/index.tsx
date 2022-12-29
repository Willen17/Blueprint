import { collection, getDocs } from '@firebase/firestore';
import { Container } from '@mui/material';
import { Inter } from '@next/font/google';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import { useSidebar } from '../context/SidebarContext';
import { db } from '../firebase/firebaseConfig';
const Test = dynamic(() => import('../components/canvas/Test'), { ssr: false }); // do not adjust this - M1 mac needs this to run canvas
const inter = Inter({ subsets: ['latin'] });

export default function Home(props: any) {
  const { setAllFrames } = useSidebar();
  useEffect(() => {
    setAllFrames(props.frames);
  }, [props.frames, setAllFrames]);

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
