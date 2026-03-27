import type { ToastType } from '../types';

/**
 * ? Colors for each toast type
 */
export const TYPE_COLORS: Record<Exclude<ToastType, 'loading'>, string> = {
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
};

/**
 * ? Default values for toast
 */
export const DEFAULTS = {
  DURATION: 3000,
  POSITION: 'top' as const,
  THEME: 'system' as const,
  TYPE: 'info' as const,
} as const;

/**
 * ? Animation values for toast
 */
export const ANIMATION = {
  FRICTION: 8,
  TENSION: 40,
  FADE_DURATION: 300,
  HIDE_DURATION: 300,
} as const;

/**
 * ? Gesture values for toast
 */
export const GESTURE = {
  SWIPE_THRESHOLD: 40,
} as const;

/**
 * ? Toast gap
 */
export const TOAST_GAP = 8;
