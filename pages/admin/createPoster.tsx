import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import PosterForm from '../../components/PosterForm';
import schemaPoster, { PosterData } from '../../lib/valSchemas';

export default function FormTest() {
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

  const submit = (data: PosterData) => console.log(data);

  return (
    <PosterForm
      onSubmit={submit}
      register={register}
      formHandleSubmit={handleSubmit}
      errors={errors}
      control={control}
    />
  );
}
