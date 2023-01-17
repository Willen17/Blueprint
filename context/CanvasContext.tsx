import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Canvas, CanvasItem } from '../components/types';
import { useSidebar } from './SidebarContext';

interface CanvasContextValue {
  canvas: Canvas;
  setBackground: (background: { image: string; cmInPixels?: number }) => void;
  getBackground: () =>
    | {
        image: string;
        cmInPixels?: number | undefined;
      }
    | undefined;
  getItems: () => CanvasItem[];
  addItem: (item: CanvasItem) => void;
  updateItem: (item: CanvasItem) => void;
  deleteItem: (item: CanvasItem) => void;
  setCanvas: Dispatch<SetStateAction<Canvas>>;
}

export const CanvasContext = createContext<CanvasContextValue>({
  canvas: { user: undefined, items: [] },
  setBackground: () => {},
  getBackground: () => undefined,
  getItems: () => [],
  addItem: () => {},
  updateItem: () => {},
  deleteItem: () => {},
  setCanvas: () => {},
});

const CanvasContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    setIsEditingFrame,
    isEditingFrame,
    setAnchorSidebar,
    endEditMode,
    poster,
    frameSet,
    withPassepartout,
  } = useSidebar();

  const [canvas, setCanvas] = useState<Canvas>(() => {
    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('canvas');
      return localData
        ? JSON.parse(localData)
        : {
            title: '',
            background: '',
            id: '',
            user: undefined,
            items: [],
          };
    }
  });

  const setBackground = (background: {
    image: string;
    cmInPixels?: number;
  }) => {
    const newCanvas = { ...canvas, background: background };
    setCanvas({ ...canvas, background });
  };

  const getBackground = () => {
    if (canvas.background) return canvas.background;
    else return undefined;
  };

  const getItems = () => {
    return canvas.items;
  };

  const addItem = (item: CanvasItem) => {
    const newCanvas = { ...canvas, items: [...canvas.items, item] };
    setCanvas(newCanvas);
  };

  const updateItem = (item: CanvasItem) => {
    const newItems = canvas.items.map((canvasItem) => {
      if (item.id === canvasItem.id) return item;
      else return canvasItem;
    });
    setCanvas({ ...canvas, items: newItems });
    if (!isEditingFrame.item?.poster.id) endEditMode();
  };

  const deleteItem = (item: CanvasItem) => {
    const newItems = canvas.items.filter((i) => i.id !== item.id);
    setCanvas({ ...canvas, items: newItems });
    if (newItems.length > 0) setAnchorSidebar(false);
    endEditMode();
  };

  useEffect(() => {
    localStorage.setItem('canvas', JSON.stringify(canvas));
  }, [canvas]);

  useEffect(() => {
    if (poster.id && frameSet.id) {
      addItem({
        frame: frameSet,
        poster: poster,
        withPassepartout: withPassepartout,
        id: uuidv4(),
        position: { x: 20, y: 50 },
      });
      endEditMode();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poster, frameSet, withPassepartout]);

  return (
    <CanvasContext.Provider
      value={{
        // background,
        setBackground,
        getBackground,
        getItems,
        addItem,
        updateItem,
        deleteItem,
        canvas,
        setCanvas,
        // withPassepartout,
        // setWithPassepartout,
        // poster,
        // setPoster,
        // posterOrientation,
        // setPosterOrientation,
        // frameSet,
        // setFrameSet,

        // deleteFrame,
        // size,
        // setSize,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
export const useCanvas = () => useContext(CanvasContext);
