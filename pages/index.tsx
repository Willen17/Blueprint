import { collection, getDocs } from '@firebase/firestore';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect } from 'react';
import { Background, Frame, Poster } from '../components/types';
import { useSidebar } from '../context/SidebarContext';
import { db } from '../firebase/firebaseConfig';

const Canvas = dynamic(() => import('../components/canvas/Canvas'), {
  ssr: false,
}); // do not adjust this - M1 mac needs this to run canvas

export const getStaticProps = async () => {
  const framesCollectionRef = collection(db, 'frames');
  const frameData = await getDocs(framesCollectionRef);
  const backgroundsCollectionRef = collection(db, 'backgrounds');
  const backgroundData = await getDocs(backgroundsCollectionRef);
  const postersCollectionRef = collection(db, 'posters');
  const posterData = await getDocs(postersCollectionRef);

  return {
    props: {
      frames: frameData.docs.map((doc) => ({
        ...(doc.data() as Frame),
        id: doc.id,
      })),
      backgrounds: backgroundData.docs.map((doc) => ({
        ...(doc.data() as Background),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toDateString(),
      })),
      posters: posterData.docs.map((doc) => ({
        ...(doc.data() as Poster),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toDateString(),
      })),
    },
  };
};

export default function Home({
  frames,
  backgrounds,
  posters,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { setAllFrames, setAllBackgrounds, setAllPosters } = useSidebar();
  useEffect(
    () => setAllBackgrounds(backgrounds),
    [backgrounds, setAllBackgrounds]
  );
  useEffect(() => setAllFrames(frames), [frames, setAllFrames]);
  useEffect(() => setAllPosters(posters), [posters, setAllPosters]);

  return (
    <>
      <Head>
        <title>Blue print | Visualize your frames</title>
        <meta name="description" content="Visualize your frames" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Canvas />
    </>
  );
}
