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

export interface FrameDimension {
  width: number;
  height: number;
}

export interface Frame {
  frame: () => JSX.Element;
  size: FrameDimension[];
  title: string;
  id?: string;
  category: string[];
}
