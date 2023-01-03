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
}

export const CanvasContext = createContext<CanvasContextValue>({
  background: '',
  setBackground: () => '',
  withPassepartout: true,
  setWithPassepartout: () => true,
  poster: { id: '', image: '', isPortrait: undefined },
  setPoster: () => '',
  posterOrientation: '',
  setPosterOrientation: () => '',
  frameSet: { id: '', title: '', size: '' },
  setFrameSet: () => {},
  frameSets: [],
  setFrameSets: () => [],
  canvas: { user: undefined, items: [] },
  setCanvas: () => {},
});

const CanvasContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { setIsEditingFrame } = useSidebar();
  const [background, setBackground] = useState<string>('');
  const [withPassepartout, setWithPassepartout] = useState<boolean>(true);
  const [poster, setPoster] = useState<CanvasPoster>({
    id: '',
    image: '',
    isPortrait: undefined,
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
    poster: { id: '', image: '', isPortrait: undefined },
    withPassepartout: withPassepartout,
    position: { x: 0, y: 0 },
  });
  const [items, setItems] = useState<CanvasItem[]>([]);
  const [canvas, setCanvas] = useState<Canvas>({
    title: '',
    background: '',
    id: '',
    user: undefined,
    items: [item],
  });

  console.log(poster);

  /** Detects the selection under frame section in sidebar and pushes them into the "frameSets" state */
  const updateFrameSetState = useCallback(
    () => setFrameSets([...frameSets, frameSet]),
    [frameSet, frameSets]
  );

  /** Detects if the "item" state is complete and pushes it into the "items" state */
  const updateItemsState = useCallback(() => {
    if (item.frame.id && item.poster.id) {
      setItems((prevState) => [...prevState, item]);
      /** reset all states below as the item has been pushed to the items array state */
      setItem({
        frame: { id: '', title: '', size: '' },
        poster: { id: '', image: '', isPortrait: undefined },
        withPassepartout: true,
        position: { x: 0, y: 0 },
      });
      setPoster({ id: '', image: '', isPortrait: undefined });
      setFrameSet({ id: '', size: '', title: '' });
      setWithPassepartout(true);
      setIsEditingFrame(false);
    }
  }, [item, setIsEditingFrame]);

  /** Updates the "item" state for single item */
  const updateItemState = useCallback(() => {
    if (frameSet.id && frameSet.size && poster.id) {
      updateFrameSetState();
      setItem({
        frame: frameSet,
        poster: poster,
        withPassepartout: withPassepartout,
        position: { x: 0, y: 0 }, // TODO: position should be from somewhere, but now it's not tracked so i leave it 0,0
      });
    }
  }, [frameSet, poster, updateFrameSetState, withPassepartout]);

  /** Detects the states needed for Canvas and pushes them into the "canvas" state */
  /** This function shapes the canvas object for uploading to db - canvas collection */
  const updateCanvasState = useCallback(() => {
    // TODO: add all missing properties.
    // Now there is only backgournd and items, but missing all other things under type "Canvas"
    if (background)
      setCanvas((prevState) => ({ ...prevState, background: background }));
    if (items.length > 0)
      setCanvas((prevState) => ({ ...prevState, items: items }));
  }, [background, items]);

  useEffect(() => updateItemState(), [updateItemState]);
  useEffect(() => updateCanvasState(), [updateCanvasState]);
  useEffect(() => updateItemsState(), [updateItemsState]);

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
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasContextProvider;
export const useCanvas = () => useContext(CanvasContext);
