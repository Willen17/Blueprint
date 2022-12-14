import { collection } from '@firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import BackgroundForm from '../../components/BackgroundForm';
import { db, storage } from '../../firebase/firebaseConfig';
import { BackgroundData, schemaBackground } from '../../lib/valSchemas';

export default function FormTest() {
  const [file, setFile] = useState<File>();
  const [imageError, setImageError] = useState<{ message: string }>();
  const [percent, setPercent] = useState<number>(0);
  const backgroundsCollectionRef = collection(db, 'backgrounds');
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
      console.log({ ...data }, file);
      handleUpload(file, data);
    }
  };

  function handleUpload(file: File, data: BackgroundData) {
    if (!file) return alert('Please choose a file first!');
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
      (err) => console.log(err),
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
          alert(`Background ${title} was succesfully added to the database.`);
          // TODO: add more actions eg toast, navigate etc
        })
        .catch((error) => {
          console.log(error, error.code); // TODO: add action
        });
    },
    [backgroundsCollectionRef]
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
