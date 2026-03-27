import React, { createContext, useCallback, useState } from 'react';
import type {
  ToastOptions,
  ToastProps,
  PromiseOptions,
  ToastContextType,
} from '../types';
import {
  createToast,
  resolvePromiseOption,
  resolveDynamicOption,
} from '../core';
import { Toast } from '../components';

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (options: ToastOptions) => {
      const toast = createToast(options, hideToast);
      setToasts((prev) => [...prev, toast]);
      return toast.id;
    },
    [hideToast]
  );

  const updateToast = useCallback(
    (id: string, options: Partial<ToastOptions>) => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...options } : t))
      );
    },
    []
  );

  const success = useCallback(
    (message: string, description?: string, options?: Partial<ToastOptions>) =>
      showToast({ message, description, type: 'success', ...options }),
    [showToast]
  );

  const error = useCallback(
    (message: string, description?: string, options?: Partial<ToastOptions>) =>
      showToast({ message, description, type: 'error', ...options }),
    [showToast]
  );

  const warning = useCallback(
    (message: string, description?: string, options?: Partial<ToastOptions>) =>
      showToast({ message, description, type: 'warning', ...options }),
    [showToast]
  );

  const info = useCallback(
    (message: string, description?: string, options?: Partial<ToastOptions>) =>
      showToast({ message, description, type: 'info', ...options }),
    [showToast]
  );

  const loading = useCallback(
    (message: string, description?: string, options?: Partial<ToastOptions>) =>
      showToast({
        message,
        description,
        type: 'loading',
        duration: 0,
        ...options,
      }),
    [showToast]
  );

  // TODO: Promise Handler
  const promise = useCallback(
    <T,>(p: Promise<T>, options: PromiseOptions<T>) => {
      const loadingOpts = resolvePromiseOption(options.loading);
      const id = loading(
        loadingOpts.message || 'Loading...',
        loadingOpts.description,
        loadingOpts
      );

      return p
        .then((data) => {
          const finalOpts = resolveDynamicOption(options.success, data);
          updateToast(id, { type: 'success', duration: 3000, ...finalOpts });
          return data;
        })
        .catch((err) => {
          const finalOpts = resolveDynamicOption(options.error, err);
          updateToast(id, { type: 'error', duration: 4000, ...finalOpts });
          throw err;
        });
    },
    [loading, updateToast]
  );

  // TODO: Provider
  const contextValue: ToastContextType = {
    showToast,
    updateToast,
    success,
    error,
    warning,
    info,
    loading,
    promise,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </ToastContext.Provider>
  );
};
