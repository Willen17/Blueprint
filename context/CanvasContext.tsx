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
  poster: { id: '', image: '' },
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
  const [background, setBackground] = useState<string>('');
  const [withPassepartout, setWithPassepartout] = useState<boolean>(true);
  // TODO: the default should be empty but putting something for now for testing
  const [poster, setPoster] = useState<CanvasPoster>({
    id: 'NzqeB2wLemjDEO9Sqrjq',
    image:
      'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Fmilky%20way%20with%20mountains.jpeg?alt=media&token=ead8bbfe-f1e5-423d-89ee-aab6847ebac8',
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
    poster: { id: '', image: '' },
    withPassepartout: true,
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

  /** Detects the selection under frame section in sidebar and pushes them into the "frameSet" state */
  const updateFrameSetState = useCallback(() => {
    if (frameSet.id && frameSet.size && frameSet.title) {
      setFrameSets([...frameSets, frameSet]);
      setFrameSet({ id: '', size: '', title: '' });
    }
  }, [frameSet, frameSets]);

  /** Updates the "item" state for single item */
  const updateItemState = useCallback(() => {
    if (frameSet.id && frameSet.size && poster.id && withPassepartout)
      setItem({
        frame: frameSet,
        poster: poster,
        withPassepartout: withPassepartout,
        position: { x: 0, y: 0 }, // TODO: position should be from somewhere, but now it's not tracked so i leave it 0,0
      });
  }, [frameSet, poster, withPassepartout]);

  /** Detects if the "item" state is complete and pushes it into the "items" state */
  const updateItemsState = useCallback(() => {
    if (item.frame.id.length > 0 && item.poster.id.length > 0) {
      setItems((prevState) => [...prevState, item]);
      setItem({
        frame: { id: '', title: '', size: '' },
        poster: { id: '', image: '' },
        withPassepartout: true,
        position: { x: 0, y: 0 },
      });
    }
  }, [item]);

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

  useEffect(() => updateFrameSetState(), [updateFrameSetState]);
  useEffect(() => updateItemState(), [updateItemState]);
  useEffect(() => updateItemsState(), [updateItemsState]);
  useEffect(() => updateCanvasState(), [updateCanvasState]);

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
