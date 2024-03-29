import { FieldValue, Timestamp } from 'firebase/firestore';
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
  user?: string;
  cmInPixels?: number;
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
  categories: typeof posterCategories;
  createdAt?: Timestamp;
  image: string;
  id?: string;
  title: string;
  orientation: string;
  sizes: Dimension[];
  user?: string;
}

export interface CanvasItem {
  frame: CanvasFrameSet;
  poster: CanvasPoster;
  withPassepartout: boolean;
  position: { x: number; y: number };
  id: string;
}

export interface Canvas {
  title?: string;
  id?: string;
  user: string | undefined;
  createdAt?: FieldValue;
  updatedAt?: FieldValue;
  background?: Background;
  items: CanvasItem[];
}

export interface EditingFrame {
  isEditing: boolean;
  item?: CanvasItem;
}

export interface IsLoading {
  isLoading: boolean;
  message?: string;
}
export interface Notification {
  message: string;
  type: 'Warning' | 'Success' | 'Normal';
}
