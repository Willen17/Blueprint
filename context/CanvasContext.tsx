import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface CanvasContextValue {
  expandedAccordion: string | false;
  setExpandedAccordion: React.Dispatch<React.SetStateAction<string | false>>;
  isEditingFrame: boolean;
  setIsEditingFrame: React.Dispatch<React.SetStateAction<boolean>>;
  background: string;
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  backgroundCategory: string;
  setBackgroundCategory: React.Dispatch<React.SetStateAction<string>>;
  frame: string;
  setFrame: React.Dispatch<React.SetStateAction<string>>;
  frameDimension: string;
  setFrameDimension: React.Dispatch<React.SetStateAction<string>>;
  poster: string;
  setPoster: React.Dispatch<React.SetStateAction<string>>;
  posterOrientation: string;
  setPosterOrientation: React.Dispatch<React.SetStateAction<string>>;
  posterCategory: string;
  setPosterCategory: React.Dispatch<React.SetStateAction<string>>;
}

export const CanvasContext = createContext<CanvasContextValue>({
  expandedAccordion: 'backgroundPanel',
  setExpandedAccordion: () => 'backgroundPanel',
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
    'backgroundPanel'
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
