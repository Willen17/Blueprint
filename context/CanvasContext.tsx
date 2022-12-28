import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { FrameDimension } from '../components/types';

interface CanvasContextValue {
  background: string;
  setBackground: Dispatch<SetStateAction<string>>;
  frame: string;
  setFrame: Dispatch<SetStateAction<string>>;
  withPassepartout: boolean;
  setWithPassepartout: Dispatch<SetStateAction<boolean>>;
  frameDimension: FrameDimension;
  setFrameDimension: Dispatch<SetStateAction<FrameDimension>>;
  poster: string;
  setPoster: Dispatch<SetStateAction<string>>;
  posterOrientation: string;
  setPosterOrientation: Dispatch<SetStateAction<string>>;
}

export const CanvasContext = createContext<CanvasContextValue>({
  background: '',
  setBackground: () => '',
  frame: '',
  setFrame: () => '',
  withPassepartout: true,
  setWithPassepartout: () => true,
  frameDimension: { width: 0, height: 0 },
  setFrameDimension: () => {},
  poster: '',
  setPoster: () => '',
  posterOrientation: '',
  setPosterOrientation: () => '',
});

const CanvasContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [background, setBackground] = useState<string>('');
  const [frame, setFrame] = useState<string>('');
  const [withPassepartout, setWithPassepartout] = useState<boolean>(true);
  const [frameDimension, setFrameDimension] = useState<FrameDimension>({
    width: 21,
    height: 30,
  });
  const [poster, setPoster] = useState<string>('');
  const [posterOrientation, setPosterOrientation] = useState<string>('');

  return (
    <CanvasContext.Provider
      value={{
        background,
        setBackground,
        frame,
        setFrame,
        withPassepartout,
        setWithPassepartout,
        frameDimension,
        setFrameDimension,
        poster,
        setPoster,
        posterOrientation,
        setPosterOrientation,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
export const useCanvas = () => useContext(CanvasContext);
