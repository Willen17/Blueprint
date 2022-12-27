import PlainBlackPreview from '../components/frames/framePreview/PlainBlackPreview';
import PlainMaplePreview from '../components/frames/framePreview/PlainMaplePreview';
import PlainWalnutPreview from '../components/frames/framePreview/PlainWalnutPreview';
import PlainWhitePreview from '../components/frames/framePreview/PlainWhitePreview';
import { Frame } from '../components/types';

export const frameDimensions = {
  xs: { width: 21, height: 30 },
  sm: { width: 30, height: 40 },
  md: { width: 40, height: 50 },
  lg: { width: 50, height: 70 },
  xl: { width: 70, height: 100 },
};

export const frames: Frame[] = [
  {
    frame: PlainWhitePreview,
    title: 'Plain White',
    id: 'p1-white',
    category: ['White'],
    size: [
      frameDimensions.xs,
      frameDimensions.sm,
      frameDimensions.md,
      frameDimensions.lg,
      frameDimensions.xl,
    ],
  },
  {
    frame: PlainBlackPreview,
    title: 'Plain Black',
    id: 'p1-black',
    category: ['Black'],
    size: [
      frameDimensions.xs,
      frameDimensions.sm,
      frameDimensions.md,
      frameDimensions.lg,
      frameDimensions.xl,
    ],
  },
  {
    frame: PlainMaplePreview,
    title: 'Plain Maple',
    id: 'p1-maple',
    category: ['Wooden'],
    size: [
      frameDimensions.xs,
      frameDimensions.sm,
      frameDimensions.md,
      frameDimensions.lg,
      frameDimensions.xl,
    ],
  },
  {
    frame: PlainWalnutPreview,
    title: 'Plain Walnut',
    id: 'p1-walnut',
    category: ['Wooden'],
    size: [
      frameDimensions.xs,
      frameDimensions.sm,
      frameDimensions.md,
      frameDimensions.lg,
      frameDimensions.xl,
    ],
  },
];
