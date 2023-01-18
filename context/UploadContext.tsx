import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import {
  ChangeEvent,
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';
import {
  Control,
  FieldErrorsImpl,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { ref } from 'firebase/storage';
import { title } from 'process';
import { db, storage } from '../firebase/firebaseConfig';
import { BackgroundData, PosterData } from '../lib/valSchemas';
import { useNotification } from './NotificationContext';
import { useUser } from './UserContext';

interface UploadContextValue {
  openUploadModal: boolean;
  setOpenUploadModal: Dispatch<SetStateAction<boolean>>;
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  handleUpload: (file: File, imageFor: string) => void;
  submit: (imageFor: string) => void;
  addImage: (url: string, imageFor: string) => void;
  preview: string | undefined;
  setPreview: Dispatch<SetStateAction<string | undefined>>;
  handleImageChange: (event: ChangeEvent) => void;
}

export const UploadContext = createContext<UploadContextValue>({
  file: undefined,
  setFile: () => undefined,
  openUploadModal: false,
  setOpenUploadModal: () => false,
  handleUpload: () => {},
  submit: () => {},
  addImage: () => {},
  preview: '',
  setPreview: () => '',
  handleImageChange: () => {},
});

export interface CreateImageData {
  onSubmit: () => void;
  register: UseFormRegister<PosterData | BackgroundData>;
  formHandleSubmit: UseFormHandleSubmit<PosterData | BackgroundData>;
  errors: Partial<FieldErrorsImpl<PosterData | BackgroundData>>;
  control: Control<PosterData | BackgroundData>;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  file: File | undefined;
  setImageError: Dispatch<SetStateAction<{ message: string } | undefined>>;
  imageError: { message: string } | undefined;
}

const UploadContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { currentUser } = useUser();
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageError, setImageError] = useState<{ type: string }>();

  const { setNotification, setIsLoading } = useNotification();
  const [preview, setPreview] = useState<string>();

  const submit = (imageFor: string) => {
    if (!file) return; // this is being covered in the client since the upload button only displays when there is a file
    if (!imageError) handleUpload(file, imageFor);
  };

  const handleUpload = (file: File, imageFor: string) => {
    if (!file)
      return setNotification({
        message: 'Please choose a file first!',
        type: 'Warning',
      });
    const storageRef =
      imageFor === 'Poster'
        ? ref(storage, `/posters/${file.name}`)
        : ref(storage, `/backgrounds/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) =>
        setNotification({
          message: `${err.code} - ${err.message}`,
          type: 'Warning',
        }),
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          addImage(url, imageFor)
        )
    );
  };

  const addImage = useCallback(
    async (url: string, imageFor: string) => {
      const postersCollectionRef = collection(db, 'posters');
      const backgroundCollectionRef = collection(db, 'backgrounds');
      const dbCollectionRef = collection(
        db,
        imageFor === 'Poster' ? 'posters' : 'backgrounds'
      );
      const newImage =
        imageFor === 'Poster'
          ? {
              // poster object
              title: File.name,
              categories: 'Other',
              createdAt: serverTimestamp(),
              sizes: [
                { width: 21, height: 30 },
                { width: 30, height: 40 },
                { width: 40, height: 50 },
                { width: 50, height: 70 },
                { width: 70, height: 100 },
              ],
              orientation: 'Portrait', // TODO: correct this
              image: url,
              user: currentUser!.uid,
            }
          : {
              // background object
              categories: 'Other',
              createdAt: serverTimestamp(),
              title: File.name,
              image: url,
              cmInPixels: 3.5, // TODO: correct this
              user: currentUser!.uid,
            };

      await addDoc(dbCollectionRef, newImage)
        .then(() => {
          setOpenUploadModal(false);
          setIsLoading({ isLoading: false });
          setNotification({
            message: `${imageFor} ${title} is added`,
            type: 'Success',
          });
        })
        .catch((error) => {
          setIsLoading({ isLoading: false });
          setNotification({
            message: `${error.Code} - ${error}`,
            type: 'Warning',
          });
        });
    },
    [currentUser, setIsLoading, setNotification]
  );

  const handleImageChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const currentFile = target.files[0];
      // validate file size
      if (currentFile.size > 3000000) return setImageError({ type: 'format' });
      // validate if file is image file
      if (!isImageFile(currentFile)) return setImageError({ type: 'size' });
      setImageError(undefined);
      return setFile(currentFile);
    }
  };

  const isImageFile = (file: File) => {
    const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    return file && acceptedImageTypes.includes(file['type']);
  };

  return (
    <UploadContext.Provider
      value={{
        openUploadModal,
        setOpenUploadModal,
        file,
        setFile,
        handleUpload,
        submit,
        addImage,
        preview,
        setPreview,
        handleImageChange,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadContextProvider;
export const useUpload = () => useContext(UploadContext);
