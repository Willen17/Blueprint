import { createContext, FC, PropsWithChildren, useContext } from 'react';

interface CanvasContextValue {}

export const CanvasContext = createContext<CanvasContextValue>({});

const CanvasContextProvider: FC<PropsWithChildren> = ({ children }) => {
  return <CanvasContext.Provider value={{}}>{children}</CanvasContext.Provider>;
};

export default CanvasContextProvider;
export const useCanvas = () => useContext(CanvasContext);
