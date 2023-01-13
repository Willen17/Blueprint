import { frameDimensions } from '../data/frameData';
import { Dimension } from './types';

export const getSizeString = (size: Dimension) => {
  if (
    (size.width === frameDimensions.xs.width ||
      size.height === frameDimensions.xs.width) &&
    (size.width === frameDimensions.xs.height ||
      size.height === frameDimensions.xs.height)
  ) {
    return 'xs';
  } else if (
    (size.width === frameDimensions.sm.width ||
      size.height === frameDimensions.sm.width) &&
    (size.width === frameDimensions.sm.height ||
      size.height === frameDimensions.sm.height)
  ) {
    return 'sm';
  } else if (
    (size.width === frameDimensions.md.width ||
      size.height === frameDimensions.md.width) &&
    (size.width === frameDimensions.md.height ||
      size.height === frameDimensions.md.height)
  ) {
    return 'md';
  } else if (
    (size.width === frameDimensions.lg.width ||
      size.height === frameDimensions.lg.width) &&
    (size.width === frameDimensions.lg.height ||
      size.height === frameDimensions.lg.height)
  ) {
    return 'lg';
  } else {
    return 'xl';
  }
};

export const hasMatchingObjects = (arr1: any[], arr2: any[]): boolean => {
  return arr1.some((obj1) => {
    return arr2.some((obj2) => {
      return Object.entries(obj1).every(
        ([key, value]) => obj2[key] === (value as number | string).toString()
      );
    });
  });
};
