import * as yup from 'yup';

const schemaPoster = yup.object({
  title: yup
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(15, 'Title cannot be more than 15 characters')
    .required('Title is required'),
  categories: yup.array().min(1, 'Select at least one category').required(),
  orientation: yup.string().required('An orientation is required'),
  sizes: yup.array().min(1, 'At least one size must be selected').required(),
});

export const categories = [
  'Abstract',
  'Animals',
  'Floral',
  'Minimalistic',
  'Movies',
  'Nature',
  'Painting',
  'Other',
];
export const posterSizes = ['21x30', '30x40', '40x50', '50x70', '70x100'];
export type PosterData = yup.InferType<typeof schemaPoster>;
export default schemaPoster;
