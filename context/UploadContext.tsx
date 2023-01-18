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

import { ref } from 'firebase/storage';
import { db, storage } from '../firebase/firebaseConfig';
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
  imageError: string[] | undefined;
  setImageError: Dispatch<SetStateAction<string[] | undefined>>;
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
  imageError: undefined,
  setImageError: () => undefined,
});

const UploadContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { currentUser } = useUser();
  const { setNotification } = useNotification();
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageError, setImageError] = useState<string[] | undefined>(undefined);

  const submit = (imageFor: string) => {
    if (!file) return; // this is being covered in the client since the upload button only displays when there is a file
    if (imageError)
      return setNotification({
        message: 'Please select a image that meets the requirement.',
        type: 'Warning',
      });
    if (file && imageFor && !imageError) handleUpload(file, imageFor);
  };

  const handleUpload = (file: File, imageFor: string) => {
    const storageRef =
      imageFor === 'Poster'
        ? ref(storage, `/posters/${currentUser?.uid}_${file.name}`)
        : ref(storage, `/backgrounds/${currentUser?.uid}_${file.name}`);
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
      const dbCollectionRef = collection(
        db,
        imageFor === 'Poster' ? 'posters' : 'backgrounds'
      );
      const newImage =
        imageFor === 'Poster'
          ? {
              // poster object
              title: file!.name + '_' + currentUser?.uid,
              categories: ['Other'],
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
              categories: ['Other'],
              createdAt: serverTimestamp(),
              title: file!.name + '_' + currentUser?.uid,
              image: url,
              cmInPixels: 3.5, // TODO: correct this
              user: currentUser!.uid,
            };

      await addDoc(dbCollectionRef, newImage)
        .then(() => {
          setOpenUploadModal(false);
          setNotification({
            message: `${imageFor} ${file!.name} is added`,
            type: 'Success',
          });
          setFile(undefined);
          setImageError(undefined);
        })
        .catch((error) => {
          setNotification({
            message: `${error.Code} - ${error}`,
            type: 'Warning',
          });
        });
    },
    [currentUser, file, setNotification]
  );

  const handleImageChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;

    if (target.files) {
      const currentFile = target.files[0];
      const oversized = currentFile.size > 3000000;
      const notImage = !isImageFile(currentFile);
      if (oversized && notImage) {
        setImageError(['format', 'size']);
      } else if (oversized) {
        setImageError(['size']);
      } else if (notImage) {
        setImageError(['format']);
      } else {
        setImageError(undefined);
      }
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
        imageError,
        setImageError,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadContextProvider;
export const useUpload = () => useContext(UploadContext);
