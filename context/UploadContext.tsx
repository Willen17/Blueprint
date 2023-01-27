import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
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
import { v4 as uuidv4 } from 'uuid';
import { Background, Canvas, Poster } from '../components/types';
import { db, storage } from '../firebase/firebaseConfig';
import { useCanvas } from './CanvasContext';
import { useNotification } from './NotificationContext';
import { useSidebar } from './SidebarContext';
import { useUser } from './UserContext';

interface UploadContextValue {
  openUploadModal: boolean;
  setOpenUploadModal: Dispatch<SetStateAction<boolean>>;
  file: File | undefined;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  submit: () => void;
  preview: string | undefined;
  setPreview: Dispatch<SetStateAction<string | undefined>>;
  handleImageChange: (event: ChangeEvent) => void;
  imageError: string[];
  setImageError: Dispatch<SetStateAction<string[]>>;
  resetAllUploadStates: () => void;
  uploadOption: 'Poster' | 'Background' | undefined;
  setUploadOption: Dispatch<
    SetStateAction<'Poster' | 'Background' | undefined>
  >;
  removeUploadedObj: () => void;
  openRemoveImgModal: boolean;
  setOpenRemoveImgModal: Dispatch<SetStateAction<boolean>>;
  objToRemove: (Poster | Background) | undefined;
  setObjToRemove: Dispatch<SetStateAction<Poster | Background | undefined>>;
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
  uploadOption: undefined,
  setUploadOption: () => undefined,
  removeUploadedObj: () => {},
  openRemoveImgModal: false,
  setOpenRemoveImgModal: () => false,
  objToRemove: undefined,
  setObjToRemove: () => undefined,
});

const UploadContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { currentUser } = useUser();
  const { getAllBackgrounds, getAllPosters, allBackgrounds } = useSidebar();
  const { canvas, setCanvas } = useCanvas();
  const { setNotification } = useNotification();
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const [preview, setPreview] = useState<string>();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [imageError, setImageError] = useState<string[]>([]);
  const [imgDimension, setImgDimension] = useState<
    { width: number; height: number } | undefined
  >();
  const [uploadOption, setUploadOption] = useState<
    'Poster' | 'Background' | undefined
  >();
  const [openRemoveImgModal, setOpenRemoveImgModal] = useState<boolean>(false);
  const [objToRemove, setObjToRemove] = useState<
    (Poster | Background) | undefined
  >(undefined);

  /* Handle form submission */
  const submit = () => {
    if (!file) return; // this is being covered in the client since the upload button only displays when there is a file
    if (imageError.length)
      return setNotification({
        message: 'Please select a image that meets the requirement.',
        type: 'Warning',
      });
    if (file && uploadOption && !imageError.length) uploadImage();
  };

  /* Handle image upload */
  const uploadImage = () => {
    const uniqueFileName = uuidv4();
    const storageRef =
      uploadOption === 'Poster'
        ? ref(storage, `/posters/${uniqueFileName}`)
        : ref(storage, `/backgrounds/${uniqueFileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file!);

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
          addImageObjToDb(url, uniqueFileName)
        )
    );
  };

  /* Add a new document to db poster or background collection */
  const addImageObjToDb = useCallback(
    async (url: string, fileTitle: string) => {
      const dbCollectionRef = collection(
        db,
        uploadOption === 'Poster' ? 'posters' : 'backgrounds'
      );
      const newImage =
        uploadOption === 'Poster'
          ? {
              // poster object
              title: fileTitle,
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
                imgDimension && imgDimension.height >= imgDimension.width
                  ? 'Portrait'
                  : 'Landscape',
              image: url,
              user: currentUser!.uid,
            }
          : {
              // background object
              categories: ['User upload'],
              createdAt: serverTimestamp(),
              title: fileTitle,
              image: url,
              cmInPixels: 3.5,
              user: currentUser!.uid,
            };

      await addDoc(dbCollectionRef, newImage)
        .then(() => {
          uploadOption === 'Poster' ? getAllPosters() : getAllBackgrounds();
          setOpenUploadModal(false);
          setUploadOption(undefined);
          setNotification({
            message: `${uploadOption} ${file!.name} is added`,
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
    [
      currentUser,
      file,
      getAllBackgrounds,
      getAllPosters,
      imgDimension,
      setNotification,
      uploadOption,
    ]
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

      const exceedDimension = width > 4500 || height > 4500;
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

  /* Remove the selected image object from firestore */
  const removeUploadedObj = async () => {
    let collection = '';
    if (!objToRemove) return;
    if (objToRemove.user !== currentUser?.uid)
      return setNotification({
        message: 'You have no permission to delete this image',
        type: 'Warning',
      });

    // check if the objToRemove is under backgrounds or posters
    allBackgrounds.includes(objToRemove)
      ? (collection = 'backgrounds')
      : (collection = 'posters');

    const docRef = doc(db, collection, objToRemove.id!);
    await deleteDoc(docRef)
      .then(() => {
        removeUploadedImage(objToRemove.title, collection);
      })
      .catch((err) => {
        setNotification({
          message: `${err.code} - ${err.message}`,
          type: 'Warning',
        });
      });
  };

  /* Remove the selected file from firestore cloud storage */
  const removeUploadedImage = (fileTitle: string, imageCollection: string) => {
    const storage = getStorage();
    const imgRef = ref(storage, imageCollection + '/' + fileTitle);
    deleteObject(imgRef)
      .then(() => {
        setSubstituteImage(fileTitle, imageCollection);
        setOpenRemoveImgModal(false);
        setNotification({
          message: 'The file has been removed',
          type: 'Success',
        });
        imageCollection === 'backgrounds'
          ? getAllBackgrounds()
          : getAllPosters();
        setObjToRemove(undefined);
      })
      .catch((err) => {
        setNotification({
          message: `${err.code} - ${err.message}`,
          type: 'Warning',
        });
      });
  };

  const setSubstituteImage = async (
    fileTitle: string,
    imageCollection: string
  ) => {
    const dbCollectionRef = collection(db, 'canvas');
    const canvasesData = await getDocs(dbCollectionRef);
    const canvases = canvasesData.docs.map((doc) => ({
      ...(doc.data() as Canvas),
      id: doc.id,
    }));
    if (imageCollection === 'backgrounds') {
      if (canvases && canvases.some((item) => item.id === canvas.id)) {
        const currentCanvasRef = doc(db, 'canvas', canvas.id!);
        if (
          canvases.find((item) => item.id === canvas.id)!.background!.title ===
          fileTitle
        ) {
          await updateDoc(currentCanvasRef, {
            background: {
              image:
                'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Fnobg.jpg?alt=media&token=1f87fbca-5ba8-4720-b6a4-32e8c3ca6d8b',
              cmInPixels: 3.5,
              title: 'nobg',
              user: '',
              id: '0',
            },
          }).catch((err) => {
            setNotification({
              message: `${err.code} - ${err.message}`,
              type: 'Warning',
            });
          });
        }
      }
      if (canvas.background!.title === fileTitle) {
        setCanvas({
          ...canvas,
          background: {
            image:
              'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Fnobg.jpg?alt=media&token=1f87fbca-5ba8-4720-b6a4-32e8c3ca6d8b',
            cmInPixels: 3.5,
            title: 'nobg',
            user: '',
            id: '0',
            categories: canvas.background!.categories,
          },
        });
      }
    }
    if (imageCollection === 'posters') {
      if (canvases && canvases.some((item) => item.id === canvas.id)) {
        const currentCanvasRef = doc(db, 'canvas', canvas.id!);
        const currentCanvas = canvases.find((item) => item.id === canvas.id);
        if (
          currentCanvas!.items.find(
            (item) => item.poster.image === objToRemove?.image
          )
        ) {
          const currentCanvas = canvases.find((item) => item.id === canvas.id);
          let newItems = currentCanvas!.items.map((item) => {
            if (item.poster.id === objToRemove!.id) {
              return {
                ...item,
                poster: {
                  ...item.poster,
                  id: '0',
                  image: item.poster.isPortrait
                    ? 'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Fsubtitue-poster.jpg?alt=media&token=33978aab-f8b1-4552-8b94-b8373151a077'
                    : 'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Fsubstitute-poster-landscape.jpg?alt=media&token=ae438964-0990-4911-b9c5-f6bc4af3fef2',
                },
              };
            }
            return item;
          });
          await updateDoc(currentCanvasRef, {
            items: { ...newItems },
          }).catch((err) => {
            setNotification({
              message: `${err.code} - ${err.message}`,
              type: 'Warning',
            });
          });
        }
      }
      if (canvas.items.some((item) => item.poster.id === objToRemove!.id)) {
        let newItems = canvas!.items.map((item) => {
          if (item.poster.id === objToRemove!.id) {
            return {
              ...item,
              poster: {
                ...item.poster,
                id: '0',
                image: item.poster.isPortrait
                  ? 'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Fsubtitue-poster.jpg?alt=media&token=33978aab-f8b1-4552-8b94-b8373151a077'
                  : 'https://firebasestorage.googleapis.com/v0/b/blueprint-298a2.appspot.com/o/posters%2Fsubstitute-poster-landscape.jpg?alt=media&token=ae438964-0990-4911-b9c5-f6bc4af3fef2',
              },
            };
          }
          return item;
        });
        setCanvas({
          ...canvas,
          items: newItems,
        });
      }
    }
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
        uploadOption,
        setUploadOption,
        removeUploadedObj,
        openRemoveImgModal,
        setOpenRemoveImgModal,
        objToRemove,
        setObjToRemove,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadContextProvider;
export const useUpload = () => useContext(UploadContext);
