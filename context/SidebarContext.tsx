import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Frame, sidebarSections } from '../components/types';

interface SidebarContextValue {
  expandedAccordion: string | false;
  setExpandedAccordion: Dispatch<SetStateAction<string | false>>;
  openMobileSection: string;
  setOpenMobileSection: Dispatch<SetStateAction<string>>;
  isEditingFrame: boolean;
  setIsEditingFrame: Dispatch<SetStateAction<boolean>>;
  backgroundCategory: string;
  setBackgroundCategory: Dispatch<SetStateAction<string>>;
  posterCategory: string;
  setPosterCategory: Dispatch<SetStateAction<string>>;
  allFrames: Frame[];
  setAllFrames: Dispatch<SetStateAction<Frame[]>>;
}

export const SidebarContext = createContext<SidebarContextValue>({
  expandedAccordion: '',
  setExpandedAccordion: () => '',
  openMobileSection: '',
  setOpenMobileSection: () => '',
  isEditingFrame: false,
  setIsEditingFrame: () => false,
  backgroundCategory: '',
  setBackgroundCategory: () => '',
  posterCategory: '',
  setPosterCategory: () => '',
  allFrames: [],
  setAllFrames: () => [],
});

const SidebarContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    sidebarSections[0]
  );
  const [openMobileSection, setOpenMobileSection] = useState<string>(
    sidebarSections[0]
  );
  const [backgroundCategory, setBackgroundCategory] = useState<string>('');
  const [posterCategory, setPosterCategory] = useState<string>('');
  const [allFrames, setAllFrames] = useState<Frame[]>([]);

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
        backgroundCategory,
        setBackgroundCategory,
        posterCategory,
        setPosterCategory,
        allFrames,
        setAllFrames,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
export const useSidebar = () => useContext(SidebarContext);
