import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
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
import { getImageSize } from 'react-image-size';
import { db, storage } from '../firebase/firebaseConfig';
import { useNotification } from './NotificationContext';
import { useUser } from './UserContext';

interface UploadContextValue {
  openUploadModal: boolean;
  setOpenUploadModal: Dispatch<SetStateAction<boolean>>;
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  submit: (imageFor: string) => void;
  preview: string | undefined;
  setPreview: Dispatch<SetStateAction<string | undefined>>;
  handleImageChange: (event: ChangeEvent) => void;
  imageError: string[];
  setImageError: Dispatch<SetStateAction<string[]>>;
  resetAllUploadStates: () => void;
}

export const UploadContext = createContext<UploadContextValue>({
  file: undefined,
  setFile: () => undefined,
  openUploadModal: false,
  setOpenUploadModal: () => false,
  submit: () => {},
  preview: '',
  setPreview: () => '',
  handleImageChange: () => {},
  imageError: [],
  setImageError: () => [],
  resetAllUploadStates: () => {},
});

const UploadContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { currentUser } = useUser();
  const { setNotification } = useNotification();
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageError, setImageError] = useState<string[]>([]);
  const [imgDimension, setImgDimension] = useState<
    { width: number; height: number } | undefined
  >();

  /* Handle form submission */
  const submit = (imageFor: string) => {
    if (!file) return; // this is being covered in the client since the upload button only displays when there is a file
    if (imageError)
      return setNotification({
        message: 'Please select a image that meets the requirement.',
        type: 'Warning',
      });
    if (file && imageFor && !imageError) uploadImage(file, imageFor);
  };

  /* Handle image upload */
  const uploadImage = (file: File, imageFor: string) => {
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
          addImageObjToDb(url, imageFor)
        )
    );
  };

  /* Add a new document to db poster or background collection */
  const addImageObjToDb = useCallback(
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
              categories: ['User upload'],
              createdAt: serverTimestamp(),
              sizes: [
                { width: 21, height: 30 },
                { width: 30, height: 40 },
                { width: 40, height: 50 },
                { width: 50, height: 70 },
                { width: 70, height: 100 },
              ],
              orientation:
                imgDimension && imgDimension.height > imgDimension.width
                  ? 'Portrait'
                  : 'Landscape',
              image: url,
              user: currentUser!.uid,
            }
          : {
              // background object
              categories: ['User upload'],
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
          resetAllUploadStates();
        })
        .catch((error) => {
          setNotification({
            message: `${error.Code} - ${error}`,
            type: 'Warning',
          });
        });
    },
    [currentUser, file, imgDimension, setNotification]
  );

  /* Check if image meets the requirements */
  const handleImageChange = async (event: ChangeEvent) => {
    resetAllUploadStates();

    // set current file, return if no file
    const target = event.target as HTMLInputElement;
    const currentFile = target.files![0];
    if (!currentFile) return;

    // generate object url
    const objectUrl = URL.createObjectURL(currentFile);
    setFile(currentFile);
    setPreview(objectUrl);
    () => URL.revokeObjectURL(objectUrl);

    // check size limit, despite file type
    const oversized = currentFile.size > 3000000;
    if (oversized) setImageError((prevState) => [...prevState, 'size']);

    // check file type
    const isImage = isImageFile(currentFile);
    if (!isImage) setImageError((prevState) => [...prevState, 'format']);

    // check dimension
    if (isImage) {
      const { width, height } = await getImageSize(objectUrl);
      setImgDimension({ width, height });

      const exceedDimension = width > 3000 || height > 3000;
      exceedDimension &&
        setImageError((prevState) => [...prevState, 'dimension']);
    }
  };

  /* Check image format */
  const isImageFile = (file: File) => {
    const acceptedImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    return acceptedImageTypes.includes(file['type']);
  };

  /* Reset all states in the upload context except for openModal */
  const resetAllUploadStates = () => {
    setFile(undefined);
    setPreview(undefined);
    setImgDimension(undefined);
    setImageError([]);
  };

  return (
    <UploadContext.Provider
      value={{
        openUploadModal,
        setOpenUploadModal,
        file,
        setFile,
        submit,
        preview,
        setPreview,
        handleImageChange,
        imageError,
        setImageError,
        resetAllUploadStates,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadContextProvider;
export const useUpload = () => useContext(UploadContext);
