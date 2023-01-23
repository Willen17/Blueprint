import { collection, getDocs } from 'firebase/firestore';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

import {
  Background,
  CanvasFrameSet,
  CanvasItem,
  CanvasPoster,
  EditingFrame,
  Frame,
  Poster,
} from '../components/types';
import { db } from '../firebase/firebaseConfig';
import { sidebarSections } from '../lib/valSchemas';

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
    'User upload': boolean;
  };
  setBackgroundCategories: Dispatch<
    SetStateAction<{
      'Living room': boolean;
      Bedroom: boolean;
      'Dining room': boolean;
      Color: boolean;
      Office: boolean;
      Other: boolean;
      'User upload': boolean;
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
    'User upload': boolean;
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
      'User upload': boolean;
    }>
  >;
  allFrames: Frame[];
  setAllFrames: Dispatch<SetStateAction<Frame[]>>;
  allBackgrounds: Background[];
  setAllBackgrounds: Dispatch<SetStateAction<Background[]>>;
  allPosters: Poster[];
  setAllPosters: Dispatch<SetStateAction<Poster[]>>;
  handleSelectItem: (item: CanvasItem) => void;
  endEditMode: () => void;
  withPassepartout: boolean;
  setWithPassepartout: Dispatch<SetStateAction<boolean>>;
  poster: CanvasPoster;
  setPoster: Dispatch<SetStateAction<CanvasPoster>>;
  posterOrientation: string;
  setPosterOrientation: Dispatch<SetStateAction<string>>;
  frameSet: CanvasFrameSet;
  setFrameSet: Dispatch<SetStateAction<CanvasFrameSet>>;
  getAllBackgrounds: () => void;
  getAllPosters: () => void;
  removeUploadedObj: () => void;
  openRemoveImgModal: boolean;
  setOpenRemoveImgModal: Dispatch<SetStateAction<boolean>>;
  objToRemove: (Poster | Background) | undefined;
  setObjToRemove: Dispatch<SetStateAction<Poster | Background | undefined>>;
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
    'User upload': false,
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
    'User upload': false,
  },
  setPosterCategories: () => {},
  allFrames: [],
  setAllFrames: () => [],
  allBackgrounds: [],
  setAllBackgrounds: () => [],
  allPosters: [],
  setAllPosters: () => [],
  handleSelectItem: () => {},
  endEditMode: () => {},
  withPassepartout: true,
  setWithPassepartout: () => true,
  poster: { id: '', image: '', isPortrait: undefined, sizes: [] },
  setPoster: () => {},
  posterOrientation: '',
  setPosterOrientation: () => '',
  frameSet: { id: '', title: '', size: '' },
  setFrameSet: () => {},
  getAllBackgrounds: () => {},
  getAllPosters: () => {},
  removeUploadedObj: () => {},
  openRemoveImgModal: false,
  setOpenRemoveImgModal: () => false,
  objToRemove: undefined,
  setObjToRemove: () => undefined,
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
    'User upload': false,
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
    'User upload': false,
  });
  const [allFrames, setAllFrames] = useState<Frame[]>([]);
  const [allBackgrounds, setAllBackgrounds] = useState<Background[]>([]);
  const [allPosters, setAllPosters] = useState<Poster[]>([]);
  const [isEditingFrame, setIsEditingFrame] = useState<EditingFrame>({
    isEditing: false,
  });
  const [withPassepartout, setWithPassepartout] = useState<boolean>(true);
  const [poster, setPoster] = useState<CanvasPoster>({
    id: '',
    image: '',
    isPortrait: undefined,
    sizes: [],
  });
  const [posterOrientation, setPosterOrientation] = useState<string>('');
  const [frameSet, setFrameSet] = useState<CanvasFrameSet>({
    id: '',
    title: '',
    size: '',
  });
  const [openRemoveImgModal, setOpenRemoveImgModal] = useState<boolean>(false);
  const [objToRemove, setObjToRemove] = useState<
    (Poster | Background) | undefined
  >(undefined);

  const handleSelectItem = (item: CanvasItem) => {
    setAnchorSidebar(true);
    setIsEditingFrame({ isEditing: true, item });
    setWithPassepartout(item.withPassepartout);
    setExpandedAccordion(sidebarSections[2]);
  };

  const endEditMode = () => {
    if (isEditingFrame) setIsEditingFrame({ isEditing: false });
    setFrameSet({ id: '', title: '', size: '' });
    setPoster({
      id: '',
      image: '',
      isPortrait: undefined,
      sizes: [],
    });
    setPosterOrientation('');
  };

  const getAllBackgrounds = useCallback(async () => {
    const backgroundsCollectionRef = collection(db, 'backgrounds');
    const backgroundData = await getDocs(backgroundsCollectionRef);
    setAllBackgrounds(
      backgroundData.docs.map((doc) => ({
        ...(doc.data() as Background),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toDateString(),
      }))
    );
  }, [setAllBackgrounds]);

  const getAllPosters = useCallback(async () => {
    const postersCollectionRef = collection(db, 'posters');
    const posterData = await getDocs(postersCollectionRef);
    setAllPosters(
      posterData.docs.map((doc) => ({
        ...(doc.data() as Poster),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toDateString(),
      }))
    );
  }, [setAllPosters]);

  const removeUploadedObj = () => {
    console.log('called remove', objToRemove);
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
        endEditMode,
        withPassepartout,
        setWithPassepartout,
        poster,
        setPoster,
        posterOrientation,
        setPosterOrientation,
        frameSet,
        setFrameSet,
        getAllBackgrounds,
        getAllPosters,
        removeUploadedObj,
        openRemoveImgModal,
        setOpenRemoveImgModal,
        objToRemove,
        setObjToRemove,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
export const useSidebar = () => useContext(SidebarContext);
