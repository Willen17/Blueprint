import { User as FirebaseUser } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { backgroundCategories, posterCategories } from '../lib/valSchemas';

export interface Dimension {
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

export interface CanvasPoster {
  id: string;
  image: string;
  isPortrait: boolean | undefined;
  sizes: Dimension[];
}

export interface Poster {
  categories: string[];
  createdAt?: typeof posterCategories;
  image: string;
  id?: string;
  title: string;
  orientation: string;
  sizes: Dimension[];
}

export interface CanvasItem {
  frame: CanvasFrameSet;
  poster: CanvasPoster;
  withPassepartout: boolean;
  position: { x: number; y: number };
}

export interface Canvas {
  title?: string;
  id?: string;
  user: FirebaseUser | undefined;
  createdAt?: Timestamp; // TODO: change. Optional for now as this is not what im working on in this issue
  updatedAt?: Timestamp; // TODO: change. Optional for now as this is not what im working on in this issue
  background?: string; // TODO: put the correct type. Wille is working on this so i dont bother the type here
  items: CanvasItem[];
}

export interface EditingFrame {
  isEditing: boolean;
  item?: CanvasItem;
}
