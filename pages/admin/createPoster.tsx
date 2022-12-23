import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import PosterForm from '../../components/PosterForm';
import schemaPoster, { PosterData } from '../../lib/valSchemas';

export default function FormTest() {
  const [file, setFile] = useState<File>();
  const [imageError, setImageError] = useState<{ message: string }>();
  const {
    register,
    handleSubmit,
    setError,
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
    else if (!imageError) console.log({ ...data }, file);
  };
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
