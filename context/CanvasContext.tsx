import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Canvas,
  CanvasFrameSet,
  CanvasItem,
  CanvasPoster,
} from '../components/types';
import { useSidebar } from './SidebarContext';

interface CanvasContextValue {
  background: string;
  setBackground: Dispatch<SetStateAction<string>>;
  withPassepartout: boolean;
  setWithPassepartout: Dispatch<SetStateAction<boolean>>;
  poster: CanvasPoster;
  setPoster: Dispatch<SetStateAction<CanvasPoster>>;
  posterOrientation: string;
  setPosterOrientation: Dispatch<SetStateAction<string>>;
  frameSet: CanvasFrameSet;
  setFrameSet: Dispatch<SetStateAction<CanvasFrameSet>>;
  frameSets: CanvasFrameSet[];
  setFrameSets: Dispatch<SetStateAction<CanvasFrameSet[]>>;
  canvas: Canvas;
  setCanvas: Dispatch<SetStateAction<Canvas>>;
  deleteFrame: () => void;
}

export const CanvasContext = createContext<CanvasContextValue>({
  background: '',
  setBackground: () => '',
  withPassepartout: true,
  setWithPassepartout: () => true,
  poster: { id: '', image: '', isPortrait: undefined, sizes: [] },
  setPoster: () => '',
  posterOrientation: '',
  setPosterOrientation: () => '',
  frameSet: { id: '', title: '', size: '' },
  setFrameSet: () => {},
  frameSets: [],
  setFrameSets: () => [],
  canvas: { user: undefined, items: [] },
  setCanvas: () => {},
  deleteFrame: () => {},
});

const CanvasContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setIsEditingFrame, isEditingFrame, setAnchorSidebar } = useSidebar();
  const [background, setBackground] = useState<string>('');
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
  const [frameSets, setFrameSets] = useState<CanvasFrameSet[]>([]);
  const [item, setItem] = useState<CanvasItem>({
    frame: frameSet,
    poster: { id: '', image: '', isPortrait: undefined, sizes: [] },
    withPassepartout: withPassepartout,
    position: { x: 0, y: 0 },
    id: '',
  });
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [canvas, setCanvas] = useState<Canvas>({
    title: '',
    background: '',
    id: '',
    user: undefined,
    items: [],
  });

  /** reset all states below as the item has been pushed to the items array state */
  const clearStates = useCallback(() => {
    setItem({
      frame: { id: '', title: '', size: '' },
      poster: { id: '', image: '', isPortrait: undefined, sizes: [] },
      withPassepartout: true,
      position: { x: 0, y: 0 },
      id: '',
    });
    setFrameSet({ id: '', size: '', title: '' });
    setPoster({ id: '', image: '', isPortrait: undefined, sizes: [] });
  }, []);

  /** Detects the selection under frame section in sidebar and pushes them into the "frameSets" state */
  const updateFrameSetsState = useCallback(() => {
    setFrameSets([...frameSets, frameSet]);
  }, [frameSet, frameSets]);

  /** Detects if the "item" state is complete and pushes it into the "items" state */
  const updateItemsState = useCallback(() => {
    if (item.frame.id && item.poster.id) {
      if (isEditingFrame.item) {
        const index = items.findIndex(
          (i) => i.frame.id === isEditingFrame.item?.frame.id
        );
        items[index] = item;
      } else {
        setItems((prevState) => [...prevState, item]);
      }
      clearStates();
      setIsEditingFrame({ isEditing: false });
    }
  }, [clearStates, isEditingFrame.item, item, items, setIsEditingFrame]);

  /** Updates the "item" state for single item */
  const updateItemState = useCallback(() => {
    if (isEditingFrame.item) {
      setItem({
        frame: {
          id: frameSet.id ? frameSet.id : isEditingFrame.item.frame.id,
          title: frameSet.title
            ? frameSet.title
            : isEditingFrame.item.frame.title,
          size: frameSet.size ? frameSet.size : isEditingFrame.item.frame.size,
        },
        poster: poster ? poster : isEditingFrame.item.poster,
        withPassepartout: withPassepartout,
        position: isEditingFrame.item.position, // TODO: position should be from somewhere, but now it's not tracked so i leave it 0,0
        id: isEditingFrame.item.id,
      });
    } else if (frameSet.id && frameSet.size && poster.id) {
      updateFrameSetsState();
      setItem({
        frame: frameSet,
        poster: poster,
        withPassepartout: withPassepartout,
        position: { x: 0, y: 0 }, // TODO: position should be from somewhere, but now it's not tracked so i leave it 0,0
        id: uuidv4(),
      });
    }
  }, [
    frameSet,
    isEditingFrame.item,
    poster,
    updateFrameSetsState,
    withPassepartout,
  ]);

  /** Handles click for deleting a frame in the canvas */
  const deleteFrame = () => {
    const newList = items.filter((i) => i !== isEditingFrame.item);
    setItems(newList);
    if (newList.length > 0) setAnchorSidebar(false);
    setIsEditingFrame({ isEditing: false });
  };

  /** Detects the states needed for Canvas and pushes them into the "canvas" state */
  /** This function shapes the canvas object for uploading to db - canvas collection */
  const updateCanvasState = useCallback(() => {
    // TODO: add all missing properties.
    // Now there is only backgournd and items, but missing all other things under type "Canvas"
    if (background)
      setCanvas((prevState) => ({ ...prevState, background: background }));
    if (items.length >= 0)
      setCanvas((prevState) => ({ ...prevState, items: items }));
  }, [background, items]);

  useEffect(() => updateItemState(), [updateItemState]);
  useEffect(() => updateCanvasState(), [updateCanvasState]);
  useEffect(() => updateItemsState(), [updateItemsState]);

  useEffect(() => {
    console.log(canvas);
  }, [canvas]);

  return (
    <CanvasContext.Provider
      value={{
        background,
        setBackground,
        withPassepartout,
        setWithPassepartout,
        poster,
        setPoster,
        posterOrientation,
        setPosterOrientation,
        frameSet,
        setFrameSet,
        frameSets,
        setFrameSets,
        canvas,
        setCanvas,
        deleteFrame,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
export const useCanvas = () => useContext(CanvasContext);
