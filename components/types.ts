import { User as FirebaseUser } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { backgroundCategories } from '../lib/valSchemas';

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
  frame?: () => JSX.Element;
  sizes: string[];
  title: string;
  id?: string;
  category: string[];
  image?: string;
}

export type Background = {
  image: string;
  title: string;
  categories: typeof backgroundCategories;
  id?: string;
  createdAt?: Timestamp;
};

export interface CanvasFrameSet {
  id: string;
  title: string;
  size: string;
}

export interface Canvas {
  title: string;
  id?: string;
  user: FirebaseUser;
  createdAt?: Timestamp; // TODO: change. Optional for now as this is not what im working on in this issue
  updatedAt?: Timestamp; // TODO: change. Optional for now as this is not what im working on in this issue
  background: any; // TODO: put the correct type. Wille is working on this so i dont bother the type here
  items: [
    {
      frame: CanvasFrameSet;
      poster: { id: string; src: string };
      withPassepartout: boolean;
      position: { x: number; y: number };
    }
  ];
}
