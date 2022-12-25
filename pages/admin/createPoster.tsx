import { collection } from '@firebase/firestore';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import PosterForm from '../../components/PosterForm';
import { db, storage } from '../../firebase/firebaseConfig';
import schemaPoster, { PosterData } from '../../lib/valSchemas';

export default function FormTest() {
  const [file, setFile] = useState<File>();
  const [imageError, setImageError] = useState<{ message: string }>();
  const [percent, setPercent] = useState<number>(0);
  const postersCollectionRef = collection(db, 'posters');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<PosterData>({
    mode: 'onChange',
    resolver: yupResolver(schemaPoster),
    defaultValues: {
      title: '',
      categories: [],
      sizes: [],
    },
  });

  const submit = (data: PosterData) => {
    if (!file) setImageError({ message: 'An image is required' });
    else if (!imageError) {
      console.log({ ...data }, file);
      handleUpload(file, data);
    }
  };

  function handleUpload(file: File, data: PosterData) {
    if (!file) return alert('Please choose a file first!');
    const storageRef = ref(storage, `/posters/${file.name}`);
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
          addPoster(url, data)
        )
    );
  }

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
          setPercent(0);
          alert(`Poster ${title} was succesfully added to the database.`);
          // TODO: add more actions eg toast, navigate etc
        })
        .catch((error) => {
          console.log(error, error.code); // TODO: add action
        });
    },
    [postersCollectionRef]
  );
  return (
    <>
      <PosterForm
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
