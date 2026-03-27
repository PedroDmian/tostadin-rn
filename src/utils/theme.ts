import type { ToastTheme, ToastType } from '../types';
import { TYPE_COLORS } from '../constants';

interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  descColor: string;
  borderColor: string;
  typeColor: string;
}

/**
 * ? Resolve the active theme based on the user's preference and the system configuration.
 */
export const resolveTheme = (
  theme: ToastTheme,
  systemColorScheme: string | null | undefined
): 'light' | 'dark' => {
  if (theme === 'system') {
    return systemColorScheme === 'light' ? 'light' : 'dark';
  }
  return theme;
};

/**
 * ? Generate the theme colors based on the active mode and the toast type.
 */
export const getThemeColors = (
  isDark: boolean,
  type: ToastType
): ThemeColors => {
  const typeColor =
    type === 'loading' ? (isDark ? '#FFF' : '#000') : TYPE_COLORS[type];

  return {
    backgroundColor: isDark
      ? 'rgba(28, 28, 30, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
    textColor: isDark ? '#FFFFFF' : '#1C1C1E',
    descColor: isDark ? '#A0A0A5' : '#636366',
    borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    typeColor,
  };
};
