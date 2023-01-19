import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase/firebaseConfig';
import { useCanvas } from './CanvasContext';
import { useNotification } from './NotificationContext';
import { useSidebar } from './SidebarContext';
import { useUser } from './UserContext';

interface SaveContextValue {
  openUploadModal: boolean;
  setOpenUploadModal: Dispatch<SetStateAction<boolean>>;
  saveCanvasToDataBase: (title: string) => void;
}

export const SaveContext = createContext<SaveContextValue>({
  openUploadModal: false,
  setOpenUploadModal: () => false,
  saveCanvasToDataBase: (title) => {},
});

const SaveContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const {
    setIsEditingFrame,
    isEditingFrame,
    setAnchorSidebar,
    endEditMode,
    poster,
    frameSet,
    withPassepartout,
  } = useSidebar();
  const { currentUser } = useUser();
  const { setNotification } = useNotification();
  const { setCanvas, canvas } = useCanvas();
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);

  const saveToDataBase = async (title: string) => {
    if (currentUser) {
      setCanvas({
        ...canvas,
        id: canvas.id || uuidv4(),
        title: canvas.title || title,
        user: canvas.user || currentUser,
        createdAt: canvas.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      const dbCollectionRef = collection(db, 'canvas');
      await addDoc(dbCollectionRef, canvas)
        .then(() => {
          setNotification({
            message: `${canvas.title} has been saved`,
            type: 'Success',
          });
        })
        .catch((error) => {
          setNotification({
            message: `${error.Code} - ${error}`,
            type: 'Warning',
          });
        });
    } else
      setNotification({
        message: `You have to be signed in to save your canvas`,
        type: 'Warning',
      });
  };

  const saveCanvasToDataBase = (title: string) => {
    if (currentUser) {
      saveToDataBase(title);
    } else
      setNotification({
        message: `You have to be signed in to save your canvas`,
        type: 'Warning',
      });
  };

  return (
    <SaveContext.Provider
      value={{
        openUploadModal,
        setOpenUploadModal,
        saveCanvasToDataBase,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};

export default SaveContextProvider;
export const useSave = () => useContext(SaveContext);
