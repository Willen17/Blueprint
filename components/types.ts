export const sidebarSections: string[] = ['Background', 'Frame', 'Poster'];

// can be deleted after we have inserted frames from data
export const posterCategories: string[] = [
  'Abstract',
  'Animals',
  'Floral',
  'Minimalistic',
  'Movies',
  'Nature',
  'Paintings',
  'Other',
];

export interface Frame {
  frame: () => JSX.Element;
  sizes: string[];
  title: string;
  id?: string;
  category: string[];
}
