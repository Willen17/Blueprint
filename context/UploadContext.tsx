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
import { ref } from 'yup';
import { db, storage } from '../firebase/firebaseConfig';
import { PosterData } from '../lib/valSchemas';
import { useNotification } from './NotificationContext';

interface UploadContextValue {
  openUploadModal: boolean;
  setOpenUploadModal: Dispatch<SetStateAction<boolean>>;
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  handleUpload: (file: File, data: PosterData) => void;
  submit: (data: PosterData) => void;
  addPoster: (url: string, data: PosterData) => void;
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
  addPoster: () => {},
  preview: '',
  setPreview: () => '',
  handleImageChange: () => {},
});

export interface CreateImageData {
  onSubmit: (data: PosterData) => void;
  register: UseFormRegister<PosterData>;
  formHandleSubmit: UseFormHandleSubmit<PosterData>;
  errors: Partial<FieldErrorsImpl<PosterData>>;
  control: Control<PosterData>;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  file: File | undefined;
  setImageError: Dispatch<SetStateAction<{ message: string } | undefined>>;
  imageError: { message: string } | undefined;
}

const UploadContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [imageError, setImageError] = useState<{ message: string }>();
  const postersCollectionRef = collection(db, 'posters');
  const { setNotification, setIsLoading } = useNotification();
  const [preview, setPreview] = useState<string>();

  const submit = (data: PosterData) => {
    if (!file) setImageError({ message: 'An image is required' });
    else if (!imageError) handleUpload(file, data);
  };

  const handleUpload = (file: File, data: PosterData) => {
    if (!file)
      return setNotification({
        message: 'Please choose a file first!',
        type: 'Warning',
      });
    const storageRef = ref(storage, `/posters/${file.name}`);
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
          addPoster(url, data)
        )
    );
  };

  const addPoster = useCallback(
    async (url: string, data: PosterData) => {
      const { categories, orientation, sizes, title } = data;
      const newPoster = {
        categories,
        createdAt: serverTimestamp(),
        sizes,
        title,
        orientation,
        image: url,
      };
      await addDoc(postersCollectionRef, newPoster)
        .then(() => {
          // router.reload(); // reloading not the best practice, should use reset() and setFile(undefined) instead
          // but the checkbox (2 levels down) has a local state so we only improve this practice if we have more time
          setIsLoading({ isLoading: false });
          setNotification({
            message: `Poster ${title} was succesfully added to the database`,
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
    [postersCollectionRef, setIsLoading, setNotification]
  );

  const handleImageChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const currentFile = target.files[0];
      // validate file size
      if (currentFile.size > 3000000)
        return setImageError({ message: 'Image should be less than 3MB' });
      // validate if file is image file
      if (!isImageFile(currentFile))
        return setImageError({
          message: 'Only image file formats are allowed',
        });
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
        addPoster,
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
