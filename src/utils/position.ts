import type { ToastPosition } from '../types';
import { GESTURE } from '../constants';

interface PositionConfig {
  startY: number;
  endY: number;
  hideY: number;
  swipeThreshold: number;
}

/**
 * ? Calculates the animation positions based on the toast's location.
 */
export const getPositionConfig = (position: ToastPosition): PositionConfig => {
  const isTop = position === 'top';

  return {
    startY: isTop ? -150 : 150,
    endY: isTop ? 50 : -60,
    hideY: isTop ? -200 : 200,
    swipeThreshold: isTop ? -GESTURE.SWIPE_THRESHOLD : GESTURE.SWIPE_THRESHOLD,
  };
};

/**
 * ? Determines if the swipe gesture is enough to close the toast.
 */
export const shouldDismiss = (
  position: ToastPosition,
  dy: number,
  threshold: number
): boolean => {
  return position === 'top' ? dy < threshold : dy > threshold;
};
