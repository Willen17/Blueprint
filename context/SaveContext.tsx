import {
  addDoc,
  collection,
  doc,
  FieldValue,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import { Canvas } from '../components/types';
import { db } from '../firebase/firebaseConfig';
import { useCanvas } from './CanvasContext';
import { useNotification } from './NotificationContext';
import { useUser } from './UserContext';

interface SaveContextValue {
  openLogoModal: boolean;
  setOpenLogoModal: Dispatch<SetStateAction<boolean>>;
  openSaveModal: boolean;
  setOpenSaveModal: Dispatch<SetStateAction<boolean>>;
  saveCanvasToDataBase: (title: string) => void;
}

export const SaveContext = createContext<SaveContextValue>({
  openLogoModal: false,
  setOpenLogoModal: () => false,
  openSaveModal: false,
  setOpenSaveModal: () => false,
  saveCanvasToDataBase: (title) => {},
});

const SaveContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { currentUser } = useUser();
  const { setNotification } = useNotification();
  const { setCanvas, canvas, allCanvases } = useCanvas();
  const [openLogoModal, setOpenLogoModal] = useState<boolean>(false);
  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);

  const saveToDataBase = async (
    title: string,
    createdAt: FieldValue,
    updatedAt: FieldValue
  ) => {
    if (currentUser) {
      const dbCollectionRef = collection(db, 'canvas');
      const canvasesData = await getDocs(dbCollectionRef);
      const canvases = canvasesData.docs.map((doc) => ({
        ...(doc.data() as Canvas),
        id: doc.id,
      }));

      if (canvases && canvases.some((item) => item.id === canvas.id)) {
        // logic for updating
        const currentCanvasRef = doc(db, 'canvas', canvas.id!);
        await updateDoc(currentCanvasRef, { ...canvas })
          .then(() => {
            setNotification({
              message: `${title} has been updated`,
              type: 'Success',
            });
            setOpenSaveModal(false);
            setOpenLogoModal(false);
          })
          .catch((error) => {
            setNotification({
              message: `${error.Code} - ${error}`,
              type: 'Warning',
            });
          });

        canvases.find((item) => item.id === canvas.id);
      } else {
        await addDoc(dbCollectionRef, {
          ...canvas,
          title: title,
          user: currentUser.uid,
          createdAt: createdAt,
          updatedAt: updatedAt,
        })
          .then((canvasFromDb) => {
            setCanvas({
              ...canvas,
              title: title,
              user: currentUser.uid,
              createdAt: createdAt,
              updatedAt: updatedAt,
              id: canvasFromDb.id,
            });

            setNotification({
              message: `${title} has been saved`,
              type: 'Success',
            });
            setOpenSaveModal(false);
            setOpenLogoModal(false);
          })
          .catch((error) => {
            setNotification({
              message: `${error.Code} - ${error}`,
              type: 'Warning',
            });
          });
      }
    } else
      setNotification({
        message: `You have to be signed in to save your canvas`,
        type: 'Warning',
      });
  };

  const saveCanvasToDataBase = (title: string) => {
    if (currentUser) {
      const createdAt = canvas.createdAt || serverTimestamp();
      const updatedAt = serverTimestamp();
      setCanvas({
        ...canvas,
        title: title,
        user: currentUser.uid,
        createdAt: createdAt,
        updatedAt: updatedAt,
      });
      saveToDataBase(title, createdAt, updatedAt);
    } else
      setNotification({
        message: `You have to be signed in to save your canvas`,
        type: 'Warning',
      });
  };

  return (
    <SaveContext.Provider
      value={{
        openLogoModal,
        setOpenLogoModal,
        openSaveModal,
        setOpenSaveModal,
        saveCanvasToDataBase,
      }}
    >
      {children}
    </SaveContext.Provider>
  );
};

export default SaveContextProvider;
export const useSave = () => useContext(SaveContext);
