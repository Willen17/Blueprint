import PlainBlackPreview from '../components/frames/framePreview/PlainBlackPreview';
import PlainMaplePreview from '../components/frames/framePreview/PlainMaplePreview';
import PlainWalnutPreview from '../components/frames/framePreview/PlainWalnutPreview';
import PlainWhitePreview from '../components/frames/framePreview/PlainWhitePreview';

export const frameDimensions = {
  xs: { width: 21, height: 30 },
  sm: { width: 30, height: 40 },
  md: { width: 40, height: 50 },
  lg: { width: 50, height: 70 },
  xl: { width: 70, height: 100 },
} as const;

export const frames = [
  {
    frame: PlainWhitePreview,
    id: 'EWtfJS2f1zpIHOMiZqT6',
  },
  {
    frame: PlainBlackPreview,
    id: 'y7p7AoPxjQlljP0yK19s',
  },
  {
    frame: PlainMaplePreview,
    id: 'rVKbdYQ4FIL2m0pvu8FQ',
  },
  {
    frame: PlainWalnutPreview,
    id: 'dh4w2TLpD1E6xqj2gsTl',
  },
];
