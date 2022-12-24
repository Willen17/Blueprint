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
}

export const CanvasContext = createContext<CanvasContextValue>({
  expandedAccordion: 'backgroundPanel',
  setExpandedAccordion: () => 'backgroundPanel',
});

const CanvasContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | false>(
    'backgroundPanel'
  );

  return (
    <CanvasContext.Provider
      value={{
        expandedAccordion,
        setExpandedAccordion,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
export const useCanvas = () => useContext(CanvasContext);
