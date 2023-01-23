import { collection, getDocs } from '@firebase/firestore';
import { isEqual } from 'lodash';
import { InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import router from 'next/router';
import { useEffect, useState } from 'react';
import { Background, Canvas, Frame, Poster } from '../components/types';
import { useCanvas } from '../context/CanvasContext';
import { useSave } from '../context/SaveContext';
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
  const canvasesCollectionRef = collection(db, 'canvas');
  const canvasesData = await getDocs(canvasesCollectionRef);

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
      canvases: canvasesData.docs.map((doc) => ({
        ...(doc.data() as Canvas),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toDateString(),
        updatedAt: doc.data().updatedAt.toDate().toDateString(),
      })),
    },
  };
};

const CanvasPage = ({
  frames,
  backgrounds,
  posters,
  canvases,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { setAllFrames, setAllBackgrounds, setAllPosters } = useSidebar();
  const { saveCanvasToDataBase } = useSave();
  const { canvas, setAllCanvases, allCanvases } = useCanvas();
  useEffect(
    () => setAllBackgrounds(backgrounds),
    [backgrounds, setAllBackgrounds]
  );
  useEffect(() => setAllFrames(frames), [frames, setAllFrames]);
  useEffect(() => setAllPosters(posters), [posters, setAllPosters]);
  useEffect(() => setAllCanvases(canvases), [canvases, setAllCanvases]);

  const [unsavedChanges, setUnsavedChanges] = useState(false);

  useEffect(() => {
    if (allCanvases && canvas) {
      if (allCanvases.some((item) => item.id === canvas.id)) {
        const currentItem = allCanvases.find((item) => item.id === canvas.id);

        if (
          isEqual(currentItem!.background, canvas.background) &&
          isEqual(currentItem!.items, canvas.items)
        ) {
          return setUnsavedChanges(false);
        } else {
          return setUnsavedChanges(true);
        }
      }
    }
  }, [canvas, allCanvases]);

  // warn the user if they try and leave and have unsaved changes
  useEffect(() => {
    const warningText =
      'You have unsaved changes - are you sure you wish to leave this page?';
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!unsavedChanges) return;
      handleEndSession();
      e.preventDefault();
      return (e.returnValue = warningText);
    };
    const handleBrowseAway = () => {
      if (!unsavedChanges) return;
      if (window.confirm(warningText)) return;

      router.events.emit('routeChangeError');

      if (router.asPath !== window.location.pathname) {
        window.history.pushState('', '', router.asPath);
      }
      throw 'routeChange aborted.';
    };

    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unsavedChanges]);

  const handleEndSession = async () => {
    saveCanvasToDataBase(canvas.title!);
  };
  return (
    <>
      <Head>
        <title>
          {/* TODO: if the canvas has default title as "untitled", the below if statment can be deleted */}
          {canvas?.title ? canvas.title : 'Untitled'} | Blueprint | Visualize
          your frames
        </title>
        <meta
          name="description"
          content="Visualize your frames in the blueprint canvas"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Canvas />
    </>
  );
};

export default CanvasPage;
