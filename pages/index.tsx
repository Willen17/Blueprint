import { collection, getDocs } from '@firebase/firestore';
import { Inter } from '@next/font/google';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import { Background } from '../components/types';
import { useSidebar } from '../context/SidebarContext';
import { db } from '../firebase/firebaseConfig';

const Test = dynamic(() => import('../components/canvas/Test'), { ssr: false }); // do not adjust this - M1 mac needs this to run canvas
const inter = Inter({ subsets: ['latin'] });

export const getStaticProps = async () => {
  const framesCollectionRef = collection(db, 'frames');
  const frameData = await getDocs(framesCollectionRef);

  const backgroundsCollectionRef = collection(db, 'backgrounds');
  const backgroundData = await getDocs(backgroundsCollectionRef);

  return {
    props: {
      frames: frameData.docs.map((doc) => ({
        ...(doc.data() as any),
        id: doc.id,
      })),
      backgrounds: backgroundData.docs.map((doc) => ({
        ...(doc.data() as Background),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toDateString(),
      })),
    },
  };
};

export default function Home({
  frames,
  backgrounds,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { setAllFrames, setAllBackgrounds } = useSidebar();
  useEffect(() => {
    setAllFrames(frames);
  }, [frames, setAllFrames]);
  useEffect(() => {
    setAllBackgrounds(backgrounds);
  }, [backgrounds, setAllBackgrounds]);

  return (
    <>
      <Head>
        <title>Blue print | Visualize your frames</title>
        <meta name="description" content="Visualize your frames" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Test />
    </>
  );
}
