import { collection } from '@firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import BackgroundForm from '../../components/BackgroundForm';
import { useNotification } from '../../context/NotificationContext';
import { db, storage } from '../../firebase/firebaseConfig';
import { BackgroundData, schemaBackground } from '../../lib/valSchemas';

export default function FormTest() {
  const [file, setFile] = useState<File>();
  const [imageError, setImageError] = useState<{ message: string }>();
  const [percent, setPercent] = useState<number>(0);
  const backgroundsCollectionRef = collection(db, 'backgrounds');
  const { setNotification, setIsLoading } = useNotification();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<BackgroundData>({
    mode: 'onChange',
    resolver: yupResolver(schemaBackground),
    defaultValues: {
      title: '',
      categories: [],
    },
  });

  const submit = (data: BackgroundData) => {
    if (!file) setImageError({ message: 'An image is required' });
    else if (!imageError) {
      setIsLoading({ isLoading: true });
      console.log({ ...data }, file);
      handleUpload(file, data);
    }
  };

  function handleUpload(file: File, data: BackgroundData) {
    if (!file)
      return setNotification({
        message: 'Please choose a file first!',
        type: 'Warning',
      });
    const storageRef = ref(storage, `/backgrounds/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) =>
        setNotification({
          message: `${err.code} - ${err.message}`,
          type: 'Warning',
        }),
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((url) =>
          addBackground(url, data)
        )
    );
  }

  const addBackground = useCallback(
    async (url: string, data: BackgroundData) => {
      const { categories, title } = data;
      const newBackground = {
        categories,
        createdAt: serverTimestamp(),
        title,
        image: url,
      };
      await addDoc(backgroundsCollectionRef, newBackground)
        .then(() => {
          setPercent(0);
          router.reload(); // reloading not the best practice, should use reset() and setFile(undefined) instead
          // but the checkbox (2 levels down) has a local state so we only improve this practice if we have more time
          setIsLoading({ isLoading: false });
          setNotification({
            message: `Background ${title} was succesfully added to the database`,
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
    [backgroundsCollectionRef, router, setIsLoading, setNotification]
  );
  return (
    <>
      <BackgroundForm
        onSubmit={submit}
        register={register}
        formHandleSubmit={handleSubmit}
        errors={errors}
        control={control}
        setFile={setFile}
        file={file}
        setImageError={setImageError}
        imageError={imageError}
      />
    </>
  );
}
