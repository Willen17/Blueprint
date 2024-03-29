import { frameDimensions } from '../data/frameData';
import { Background, Dimension, Poster } from './types';

/* Check the size (width and height) that passed in as an argument and return the size in string */
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

/* Find matches between 2 arrays */
export const hasMatchingObjects = (arr1: any[], arr2: any[]): boolean => {
  return arr1.some((obj1) => {
    return arr2.some((obj2) => {
      return Object.entries(obj1).every(
        ([key, value]) => obj2[key] === (value as number | string).toString()
      );
    });
  });
};

/* Compare the user and createdAt properties in a poster or bg object (used in sort function) */
export const compareUserAndCreatedAt = (
  a: Poster | Background,
  b: Poster | Background
) => {
  if (a.categories.includes('User upload')) return -1;
  if (a.createdAt && b.createdAt) {
    if (new Date(a.createdAt.toString()) > new Date(b.createdAt.toString()))
      return -1;
  }
  return 0;
};
