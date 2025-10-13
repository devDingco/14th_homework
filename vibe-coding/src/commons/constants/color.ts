/**
 * Color Token System
 * 
 * This file contains all color tokens used throughout the application.
 * Supports both light and dark mode themes.
 * Based on Figma foundation node: 3459:1130
 */

// Base color palette
export const colors = {
  // Primary colors
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  
  // Secondary colors
  secondary: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617',
  },
  
  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Semantic colors
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  
  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
    950: '#451a03',
  },
  
  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  
  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
} as const;

// Theme-specific color tokens
export const lightTheme = {
  // Background colors
  background: {
    primary: colors.neutral[50],
    secondary: colors.neutral[100],
    tertiary: colors.neutral[200],
    inverse: colors.neutral[900],
  },
  
  // Surface colors
  surface: {
    primary: '#ffffff',
    secondary: colors.neutral[50],
    tertiary: colors.neutral[100],
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Text colors
  text: {
    primary: colors.neutral[900],
    secondary: colors.neutral[700],
    tertiary: colors.neutral[500],
    inverse: colors.neutral[50],
    disabled: colors.neutral[400],
  },
  
  // Border colors
  border: {
    primary: colors.neutral[200],
    secondary: colors.neutral[300],
    focus: colors.primary[500],
    error: colors.error[500],
  },
  
  // Interactive colors
  interactive: {
    primary: colors.primary[600],
    primaryHover: colors.primary[700],
    primaryActive: colors.primary[800],
    secondary: colors.secondary[600],
    secondaryHover: colors.secondary[700],
    secondaryActive: colors.secondary[800],
  },
} as const;

export const darkTheme = {
  // Background colors
  background: {
    primary: colors.neutral[950],
    secondary: colors.neutral[900],
    tertiary: colors.neutral[800],
    inverse: colors.neutral[50],
  },
  
  // Surface colors
  surface: {
    primary: colors.neutral[900],
    secondary: colors.neutral[800],
    tertiary: colors.neutral[700],
    overlay: 'rgba(0, 0, 0, 0.7)',
  },
  
  // Text colors
  text: {
    primary: colors.neutral[50],
    secondary: colors.neutral[300],
    tertiary: colors.neutral[500],
    inverse: colors.neutral[900],
    disabled: colors.neutral[600],
  },
  
  // Border colors
  border: {
    primary: colors.neutral[700],
    secondary: colors.neutral[600],
    focus: colors.primary[400],
    error: colors.error[400],
  },
  
  // Interactive colors
  interactive: {
    primary: colors.primary[500],
    primaryHover: colors.primary[400],
    primaryActive: colors.primary[300],
    secondary: colors.secondary[400],
    secondaryHover: colors.secondary[300],
    secondaryActive: colors.secondary[200],
  },
} as const;

// Semantic color tokens (theme-aware)
export const semanticColors = {
  light: {
    success: colors.success[600],
    successBackground: colors.success[50],
    successBorder: colors.success[200],
    warning: colors.warning[600],
    warningBackground: colors.warning[50],
    warningBorder: colors.warning[200],
    error: colors.error[600],
    errorBackground: colors.error[50],
    errorBorder: colors.error[200],
    info: colors.info[600],
    infoBackground: colors.info[50],
    infoBorder: colors.info[200],
  },
  dark: {
    success: colors.success[400],
    successBackground: colors.success[950],
    successBorder: colors.success[800],
    warning: colors.warning[400],
    warningBackground: colors.warning[950],
    warningBorder: colors.warning[800],
    error: colors.error[400],
    errorBackground: colors.error[950],
    errorBorder: colors.error[800],
    info: colors.info[400],
    infoBackground: colors.info[950],
    infoBorder: colors.info[800],
  },
} as const;

// CSS custom properties generator
export const generateCSSVariables = (theme: 'light' | 'dark') => {
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  const semantics = semanticColors[theme];
  
  return {
    // Background variables
    '--color-bg-primary': themeColors.background.primary,
    '--color-bg-secondary': themeColors.background.secondary,
    '--color-bg-tertiary': themeColors.background.tertiary,
    '--color-bg-inverse': themeColors.background.inverse,
    
    // Surface variables
    '--color-surface-primary': themeColors.surface.primary,
    '--color-surface-secondary': themeColors.surface.secondary,
    '--color-surface-tertiary': themeColors.surface.tertiary,
    '--color-surface-overlay': themeColors.surface.overlay,
    
    // Text variables
    '--color-text-primary': themeColors.text.primary,
    '--color-text-secondary': themeColors.text.secondary,
    '--color-text-tertiary': themeColors.text.tertiary,
    '--color-text-inverse': themeColors.text.inverse,
    '--color-text-disabled': themeColors.text.disabled,
    
    // Border variables
    '--color-border-primary': themeColors.border.primary,
    '--color-border-secondary': themeColors.border.secondary,
    '--color-border-focus': themeColors.border.focus,
    '--color-border-error': themeColors.border.error,
    
    // Interactive variables
    '--color-interactive-primary': themeColors.interactive.primary,
    '--color-interactive-primary-hover': themeColors.interactive.primaryHover,
    '--color-interactive-primary-active': themeColors.interactive.primaryActive,
    '--color-interactive-secondary': themeColors.interactive.secondary,
    '--color-interactive-secondary-hover': themeColors.interactive.secondaryHover,
    '--color-interactive-secondary-active': themeColors.interactive.secondaryActive,
    
    // Semantic variables
    '--color-success': semantics.success,
    '--color-success-bg': semantics.successBackground,
    '--color-success-border': semantics.successBorder,
    '--color-warning': semantics.warning,
    '--color-warning-bg': semantics.warningBackground,
    '--color-warning-border': semantics.warningBorder,
    '--color-error': semantics.error,
    '--color-error-bg': semantics.errorBackground,
    '--color-error-border': semantics.errorBorder,
    '--color-info': semantics.info,
    '--color-info-bg': semantics.infoBackground,
    '--color-info-border': semantics.infoBorder,
  };
};

// Utility functions
export const getColorValue = (colorPath: string, theme: 'light' | 'dark' = 'light') => {
  const themeColors = theme === 'light' ? lightTheme : darkTheme;
  const paths = colorPath.split('.');
  
  let current: Record<string, unknown> = themeColors;
  for (const path of paths) {
    current = current[path] as Record<string, unknown>;
    if (current === undefined) return null;
  }
  
  return current;
};

export const rgba = (color: string, alpha: number) => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Export types for TypeScript
export type ColorToken = keyof typeof colors;
export type ThemeMode = 'light' | 'dark';
export type ColorScale = keyof typeof colors.primary;
