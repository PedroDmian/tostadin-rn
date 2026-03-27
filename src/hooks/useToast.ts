import { useContext } from 'react';
import { ToastContext } from '../context';
import type { ToastContextType } from '../types';

/**
 * Public hook to access the toast system.
 * Must be used within a `ToastProvider`.
 *
 * @example
 * const { success, error, promise } = useToast();
 * success('Saved!', 'Your profile has been updated');
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error(
      '[tostadin-rn] useToast must be used within a <ToastProvider>. ' +
        'Make sure to wrap your application with <ToastProvider>.'
    );
  }
  return context;
};
