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

export const sidebarSections: string[] = ['Background', 'Frame', 'Poster'];

export const posterCategories = [
  'Abstract',
  'Animals',
  'Floral',
  'Minimalistic',
  'Movies',
  'Nature',
  'Painting',
  'Other',
  'User upload',
];

export const posterSizes = [
  { width: '21', height: '30' },
  { width: '30', height: '40' },
  { width: '40', height: '50' },
  { width: '50', height: '70' },
  { width: '70', height: '100' },
];

export type PosterData = yup.InferType<typeof schemaPoster>;
export default schemaPoster;
export const schemaBackground = yup.object({
  title: yup
    .string()
    .min(2, 'Title must be at least 2 characters')
    .max(15, 'Title cannot be more than 15 characters')
    .required('Title is required'),
  categories: yup.array().min(1, 'Select at least one category').required(),
});

export const backgroundCategories = [
  'Living room',
  'Bedroom',
  'Dining room',
  'Color',
  'Office',
  'Other',
  'User upload',
];
export type BackgroundData = yup.InferType<typeof schemaBackground>;
