import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface CanvasContextValue {
  expandedAccordion: string | false;
  setExpandedAccordion: Dispatch<SetStateAction<string | false>>;
  isEditingFrame: boolean;
  setIsEditingFrame: Dispatch<SetStateAction<boolean>>;
  background: string;
  setBackground: Dispatch<SetStateAction<string>>;
  backgroundCategory: string;
  setBackgroundCategory: Dispatch<SetStateAction<string>>;
  frame: string;
  setFrame: Dispatch<SetStateAction<string>>;
  frameDimension: string;
  setFrameDimension: Dispatch<SetStateAction<string>>;
  poster: string;
  setPoster: Dispatch<SetStateAction<string>>;
  posterOrientation: string;
  setPosterOrientation: Dispatch<SetStateAction<string>>;
  posterCategory: string;
  setPosterCategory: Dispatch<SetStateAction<string>>;
}

export const CanvasContext = createContext<CanvasContextValue>({
  expandedAccordion: '1. Background',
  setExpandedAccordion: () => '1. Background',
  isEditingFrame: false,
  setIsEditingFrame: () => false,
  background: '',
  setBackground: () => '',
  backgroundCategory: '',
  setBackgroundCategory: () => '',
  frame: '',
  setFrame: () => '',
  frameDimension: '',
  setFrameDimension: () => '',
  poster: '',
  setPoster: () => '',
  posterOrientation: '',
  setPosterOrientation: () => '',
  posterCategory: '',
  setPosterCategory: () => '',
});

const CanvasContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    '1. Background'
  );
  const [background, setBackground] = useState<string>('');
  const [backgroundCategory, setBackgroundCategory] = useState<string>('');
  const [frame, setFrame] = useState<string>('');
  const [frameDimension, setFrameDimension] = useState<string>('21x30');
  const [poster, setPoster] = useState<string>('');
  const [posterOrientation, setPosterOrientation] = useState<string>('');
  const [posterCategory, setPosterCategory] = useState<string>('');

  // TODO: setIsEditingFrame must be set to true when a user clicks a frame in the canvas
  const [isEditingFrame, setIsEditingFrame] = useState<boolean>(false);

  return (
    <CanvasContext.Provider
      value={{
        expandedAccordion,
        setExpandedAccordion,
        isEditingFrame,
        setIsEditingFrame,
        background,
        setBackground,
        backgroundCategory,
        setBackgroundCategory,
        frame,
        setFrame,
        frameDimension,
        setFrameDimension,
        poster,
        setPoster,
        posterOrientation,
        setPosterOrientation,
        posterCategory,
        setPosterCategory,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
export const useCanvas = () => useContext(CanvasContext);
