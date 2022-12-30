import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Background, Frame, sidebarSections } from '../components/types';

interface SidebarContextValue {
  expandedAccordion: string | false;
  setExpandedAccordion: Dispatch<SetStateAction<string | false>>;
  openMobileSection: string;
  setOpenMobileSection: Dispatch<SetStateAction<string>>;
  isEditingFrame: boolean;
  setIsEditingFrame: Dispatch<SetStateAction<boolean>>;
  backgroundCategories: {
    'Living room': boolean;
    Bedroom: boolean;
    'Dining room': boolean;
    Color: boolean;
    Office: boolean;
    Other: boolean;
  };
  setBackgroundCategories: Dispatch<
    SetStateAction<{
      'Living room': boolean;
      Bedroom: boolean;
      'Dining room': boolean;
      Color: boolean;
      Office: boolean;
      Other: boolean;
    }>
  >;
  posterCategory: string;
  setPosterCategory: Dispatch<SetStateAction<string>>;
  allFrames: Frame[];
  setAllFrames: Dispatch<SetStateAction<Frame[]>>;
  allBackgrounds: Background[];
  setAllBackgrounds: Dispatch<SetStateAction<Background[]>>;
}

export const SidebarContext = createContext<SidebarContextValue>({
  expandedAccordion: '',
  setExpandedAccordion: () => '',
  openMobileSection: '',
  setOpenMobileSection: () => '',
  isEditingFrame: false,
  setIsEditingFrame: () => false,
  backgroundCategories: {
    'Living room': false,
    Bedroom: false,
    'Dining room': false,
    Color: false,
    Office: false,
    Other: false,
  },
  setBackgroundCategories: () => {},
  posterCategory: '',
  setPosterCategory: () => '',
  allFrames: [],
  setAllFrames: () => [],
  allBackgrounds: [],
  setAllBackgrounds: () => [],
});

const SidebarContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    sidebarSections[0]
  );
  const [openMobileSection, setOpenMobileSection] = useState<string>(
    sidebarSections[0]
  );
  const [backgroundCategories, setBackgroundCategories] = useState({
    'Living room': false,
    Bedroom: false,
    'Dining room': false,
    Color: false,
    Office: false,
    Other: false,
  });
  const [posterCategory, setPosterCategory] = useState<string>('');
  const [allFrames, setAllFrames] = useState<Frame[]>([]);
  const [allBackgrounds, setAllBackgrounds] = useState<Background[]>([]);

  // TODO: setIsEditingFrame must be set to true when a user clicks a frame in the canvas
  const [isEditingFrame, setIsEditingFrame] = useState<boolean>(false);

  return (
    <SidebarContext.Provider
      value={{
        expandedAccordion,
        setExpandedAccordion,
        openMobileSection,
        setOpenMobileSection,
        isEditingFrame,
        setIsEditingFrame,
        backgroundCategories,
        setBackgroundCategories,
        posterCategory,
        setPosterCategory,
        allFrames,
        setAllFrames,
        allBackgrounds,
        setAllBackgrounds,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
export const useSidebar = () => useContext(SidebarContext);
