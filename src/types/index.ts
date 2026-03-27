import type { ViewStyle, TextStyle } from 'react-native';

// ? Toast Types
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading';
export type ToastTheme = 'light' | 'dark' | 'system';
export type ToastPosition = 'top' | 'bottom';

// ? Action
export interface ToastAction {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

// ? Toast Props (internal, used by the component)
export interface ToastProps {
  id: string;
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  theme?: ToastTheme;
  position?: ToastPosition;
  action?: ToastAction;
  icon?: React.ReactNode;
  style?: ViewStyle;
  messageStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  onHide: (id: string) => void;
}

// ? Toast Options (public API – what the user passes)
export interface ToastOptions {
  message: string;
  description?: string;
  type?: ToastType;
  duration?: number;
  theme?: ToastTheme;
  position?: ToastPosition;
  action?: ToastAction;
  icon?: React.ReactNode;
  style?: ViewStyle;
  messageStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}

// ? Promise Options
export type PromiseOptions<T = any> = {
  loading: string | Partial<ToastOptions>;
  success: string | ((data: T) => Partial<ToastOptions> | string);
  error: string | ((error: any) => Partial<ToastOptions> | string);
};

// ? Context Type
export interface ToastContextType {
  showToast: (options: ToastOptions) => string;
  updateToast: (id: string, options: Partial<ToastOptions>) => void;
  success: (
    message: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => string;
  error: (
    message: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => string;
  warning: (
    message: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => string;
  info: (
    message: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => string;
  loading: (
    message: string,
    description?: string,
    options?: Partial<ToastOptions>
  ) => string;
  promise: <T>(promise: Promise<T>, options: PromiseOptions<T>) => Promise<T>;
}
