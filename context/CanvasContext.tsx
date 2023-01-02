import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Canvas, CanvasFrameSet } from '../components/types';
import { auth } from '../firebase/firebaseConfig';

interface CanvasContextValue {
  background: string;
  setBackground: Dispatch<SetStateAction<string>>;
  withPassepartout: boolean;
  setWithPassepartout: Dispatch<SetStateAction<boolean>>;
  poster: string;
  setPoster: Dispatch<SetStateAction<string>>;
  posterOrientation: string;
  setPosterOrientation: Dispatch<SetStateAction<string>>;
  frameSet: CanvasFrameSet;
  setFrameSet: Dispatch<SetStateAction<CanvasFrameSet>>;
  frameSets: CanvasFrameSet[];
  setFrameSets: Dispatch<SetStateAction<CanvasFrameSet[]>>;
}

export const CanvasContext = createContext<CanvasContextValue>({
  background: '',
  setBackground: () => '',
  withPassepartout: true,
  setWithPassepartout: () => true,
  poster: '',
  setPoster: () => '',
  posterOrientation: '',
  setPosterOrientation: () => '',
  frameSet: { id: '', title: '', size: '' },
  setFrameSet: () => {},
  frameSets: [],
  setFrameSets: () => [],
});

const CanvasContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [background, setBackground] = useState<string>('');
  const [withPassepartout, setWithPassepartout] = useState<boolean>(true);
  const [poster, setPoster] = useState<string>('');
  const [posterOrientation, setPosterOrientation] = useState<string>('');
  const [frameSet, setFrameSet] = useState<CanvasFrameSet>({
    id: '',
    title: '',
    size: '',
  });
  const [frameSets, setFrameSets] = useState<CanvasFrameSet[]>([]);
  const [canvas, setCanvas] = useState<Canvas>({
    title: 'My Wall',
    id: '',
    user: auth.currentUser ? auth.currentUser : undefined,
    items: [
      {
        frame: { id: '', title: '', size: '' },
        poster: { id: '', src: '' },
        withPassepartout: true,
        position: { x: 0, y: 0 },
      },
    ],
  });

  useEffect(() => {
    const obj = {
      frame: frameSet,
      poster: { id: '', src: '' },
      withPassepartout: withPassepartout,
      position: { x: 0, y: 0 },
    };
    if (background) setCanvas({ ...canvas, background: background });
    // if (frameSets) setCanvas({ ...canvas, );
  }, []);

  const addFrameSet = useCallback(async () => {
    // TODO: logic to be adjusted when the poster is in. Now a new frame is created when the user changes frame
    if (frameSet.id && frameSet.size && frameSet.title) {
      setFrameSets([...frameSets, frameSet]);
      setFrameSet({ id: '', size: '', title: '' });
    }
  }, [frameSet, frameSets]);

  useEffect(() => {
    addFrameSet();
  }, [addFrameSet]);

  console.log(frameSets);

  return (
    <CanvasContext.Provider
      value={{
        background,
        setBackground,
        withPassepartout,
        setWithPassepartout,
        poster,
        setPoster,
        posterOrientation,
        setPosterOrientation,
        frameSet,
        setFrameSet,
        frameSets,
        setFrameSets,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
export const useCanvas = () => useContext(CanvasContext);
