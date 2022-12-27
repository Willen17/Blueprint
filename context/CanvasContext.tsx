import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { sidebarSections } from '../components/types';

interface CanvasContextValue {
  expandedAccordion: string | false;
  setExpandedAccordion: Dispatch<SetStateAction<string | false>>;
  openMobileSection: string;
  setOpenMobileSection: Dispatch<SetStateAction<string>>;
  isEditingFrame: boolean;
  setIsEditingFrame: Dispatch<SetStateAction<boolean>>;
  background: string;
  setBackground: Dispatch<SetStateAction<string>>;
  backgroundCategory: string;
  setBackgroundCategory: Dispatch<SetStateAction<string>>;
  frame: string;
  setFrame: Dispatch<SetStateAction<string>>;
  withPassepartout: boolean;
  setWithPassepartout: Dispatch<SetStateAction<boolean>>;
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
  expandedAccordion: '',
  setExpandedAccordion: () => '',
  openMobileSection: '',
  setOpenMobileSection: () => '',
  isEditingFrame: false,
  setIsEditingFrame: () => false,
  background: '',
  setBackground: () => '',
  backgroundCategory: '',
  setBackgroundCategory: () => '',
  frame: '',
  setFrame: () => '',
  withPassepartout: true,
  setWithPassepartout: () => true,
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
    sidebarSections[0]
  );
  const [openMobileSection, setOpenMobileSection] = useState<string>(
    sidebarSections[0]
  );
  const [background, setBackground] = useState<string>('');
  const [backgroundCategory, setBackgroundCategory] = useState<string>('');
  const [frame, setFrame] = useState<string>('');
  const [withPassepartout, setWithPassepartout] = useState<boolean>(true);
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
        openMobileSection,
        setOpenMobileSection,
        isEditingFrame,
        setIsEditingFrame,
        background,
        setBackground,
        backgroundCategory,
        setBackgroundCategory,
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
