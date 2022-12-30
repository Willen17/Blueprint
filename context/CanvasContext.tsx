import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Canvas, CanvasFrameSet } from '../components/types';

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
  frameSet: { id: '', title: '', dimension: { width: 0, height: 0 } },
  setFrameSet: () => {},
});

const CanvasContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [background, setBackground] = useState<string>('');
  const [withPassepartout, setWithPassepartout] = useState<boolean>(true);
  const [poster, setPoster] = useState<string>('');
  const [posterOrientation, setPosterOrientation] = useState<string>('');
  const [canvas, setCanvas] = useState<Canvas>();
  const [frameSet, setFrameSet] = useState<CanvasFrameSet>({
    id: '',
    title: '',
    dimension: { width: 21, height: 30 },
  });

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
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
export const useCanvas = () => useContext(CanvasContext);
