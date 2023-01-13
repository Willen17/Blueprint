import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {
  Background,
  CanvasItem,
  EditingFrame,
  Frame,
  Poster,
} from '../components/types';
import { sidebarSections } from '../lib/valSchemas';
import { useCanvas } from './CanvasContext';

interface SidebarContextValue {
  anchorSidebar: boolean;
  setAnchorSidebar: Dispatch<SetStateAction<boolean>>;
  expandedAccordion: string | false;
  setExpandedAccordion: Dispatch<SetStateAction<string | false>>;
  openMobileSection: string;
  setOpenMobileSection: Dispatch<SetStateAction<string>>;
  isEditingFrame: EditingFrame;
  setIsEditingFrame: Dispatch<SetStateAction<EditingFrame>>;
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
  handleSelectItem: (item: CanvasItem) => void;
}

export const SidebarContext = createContext<SidebarContextValue>({
  anchorSidebar: true,
  setAnchorSidebar: () => true,
  expandedAccordion: '',
  setExpandedAccordion: () => '',
  openMobileSection: '',
  setOpenMobileSection: () => '',
  isEditingFrame: { isEditing: false },
  setIsEditingFrame: () => {},
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
  handleSelectItem: () => {},
});

const SidebarContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setWithPassepartout, setPoster, setFrameSet } = useCanvas();
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
  const [isEditingFrame, setIsEditingFrame] = useState<EditingFrame>({
    isEditing: false,
  });

  const handleSelectItem = (item: CanvasItem) => {
    setAnchorSidebar(true);
    setIsEditingFrame({ isEditing: true, item });
    setWithPassepartout(item.withPassepartout);
    setExpandedAccordion(sidebarSections[2]);
  };

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
        handleSelectItem,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
export const useSidebar = () => useContext(SidebarContext);
