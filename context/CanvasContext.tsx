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
}

export const CanvasContext = createContext<CanvasContextValue>({
  expandedAccordion: 'backgroundPanel',
  setExpandedAccordion: () => 'backgroundPanel',
  isEditingFrame: false,
  setIsEditingFrame: () => false,
});

const CanvasContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    'backgroundPanel'
  );
  // TODO: setIsEditingFrame must be set to true when a user clicks a frame in the canvas
  const [isEditingFrame, setIsEditingFrame] = useState<boolean>(false);

  return (
    <CanvasContext.Provider
      value={{
        expandedAccordion,
        setExpandedAccordion,
        isEditingFrame,
        setIsEditingFrame,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
export const useCanvas = () => useContext(CanvasContext);
