import type { ToastOptions, ToastProps } from '../types';

/**
 * ? Create a new toast with a unique ID based on a timestamp.
 */
export const createToast = (
  options: ToastOptions,
  onHide: (id: string) => void
): ToastProps => {
  const id = Date.now().toString();

  return {
    id,
    onHide,
    type: 'info',
    duration: 3000,
    position: 'top',
    ...options,
  };
};

/**
 * ? Resolves the options of a promise into a consistent ToastOptions format.
 */
export const resolvePromiseOption = (
  option: string | Partial<ToastOptions>
): Partial<ToastOptions> => {
  return typeof option === 'string' ? { message: option } : option;
};

/**
 * ? Resolves the dynamic success/error options of a promise.
 */
export const resolveDynamicOption = <T>(
  option: string | ((data: T) => Partial<ToastOptions> | string),
  data: T
): Partial<ToastOptions> => {
  const result = typeof option === 'function' ? option(data) : option;
  return typeof result === 'string' ? { message: result } : result;
};
