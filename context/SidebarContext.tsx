import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Background, Frame, Poster } from '../components/types';
import { sidebarSections } from '../lib/valSchemas';

interface SidebarContextValue {
  anchorSidebar: boolean;
  setAnchorSidebar: Dispatch<SetStateAction<boolean>>;
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
  posterCategories: {
    Abstract: boolean;
    Animals: boolean;
    Floral: boolean;
    Minimalistic: boolean;
    Movies: boolean;
    Nature: boolean;
    Painting: boolean;
    Other: boolean;
  };
  setPosterCategories: Dispatch<
    SetStateAction<{
      Abstract: boolean;
      Animals: boolean;
      Floral: boolean;
      Minimalistic: boolean;
      Movies: boolean;
      Nature: boolean;
      Painting: boolean;
      Other: boolean;
    }>
  >;
  allFrames: Frame[];
  setAllFrames: Dispatch<SetStateAction<Frame[]>>;
  allBackgrounds: Background[];
  setAllBackgrounds: Dispatch<SetStateAction<Background[]>>;
  allPosters: Poster[];
  setAllPosters: Dispatch<SetStateAction<Poster[]>>;
}

export const SidebarContext = createContext<SidebarContextValue>({
  anchorSidebar: true,
  setAnchorSidebar: () => true,
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
  posterCategories: {
    Abstract: false,
    Animals: false,
    Floral: false,
    Minimalistic: false,
    Movies: false,
    Nature: false,
    Painting: false,
    Other: false,
  },
  setPosterCategories: () => {},
  allFrames: [],
  setAllFrames: () => [],
  allBackgrounds: [],
  setAllBackgrounds: () => [],
  allPosters: [],
  setAllPosters: () => [],
});

const SidebarContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [anchorSidebar, setAnchorSidebar] = useState<boolean>(true);
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
  const [posterCategories, setPosterCategories] = useState({
    Abstract: false,
    Animals: false,
    Floral: false,
    Minimalistic: false,
    Movies: false,
    Nature: false,
    Painting: false,
    Other: false,
  });
  const [allFrames, setAllFrames] = useState<Frame[]>([]);
  const [allBackgrounds, setAllBackgrounds] = useState<Background[]>([]);
  const [allPosters, setAllPosters] = useState<Poster[]>([]);

  // TODO: setIsEditingFrame must be set to true when a user clicks a frame in the canvas
  const [isEditingFrame, setIsEditingFrame] = useState<boolean>(false);

  return (
    <SidebarContext.Provider
      value={{
        anchorSidebar,
        setAnchorSidebar,
        expandedAccordion,
        setExpandedAccordion,
        openMobileSection,
        setOpenMobileSection,
        isEditingFrame,
        setIsEditingFrame,
        backgroundCategories,
        setBackgroundCategories,
        posterCategories,
        setPosterCategories,
        allFrames,
        setAllFrames,
        allBackgrounds,
        setAllBackgrounds,
        allPosters,
        setAllPosters,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
export const useSidebar = () => useContext(SidebarContext);
