import React, { forwardRef } from 'react';
import { useTheme } from 'next-themes';
import styles from './styles.module.css';

// Button variant types
export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonTheme = 'light' | 'dark';

// Button props interface
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: ButtonTheme;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Button component with forwardRef for better ref handling
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      theme,
      children,
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      onClick,
      ...rest
    },
    ref
  ) => {
    const { theme: systemTheme } = useTheme();
    
    // Determine effective theme
    const effectiveTheme = theme || (systemTheme as ButtonTheme) || 'light';
    
    // Generate CSS class names based on props
    const buttonClasses = [
      styles.button,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${effectiveTheme}`],
      disabled && styles.disabled,
      loading && styles.loading,
      fullWidth && styles.fullWidth,
      className
    ]
      .filter(Boolean)
      .join(' ');

    // Handle click events
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || loading}
        onClick={handleClick}
        aria-disabled={disabled || loading}
        {...rest}
      >
        {/* Left icon or loading spinner */}
        {loading ? (
          <span className={styles.loadingSpinner}>
            <svg
              className={styles.spinner}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="31.416"
                strokeDashoffset="31.416"
              />
            </svg>
          </span>
        ) : leftIcon ? (
          <span className={styles.leftIcon}>
            {leftIcon}
          </span>
        ) : null}
        
        {/* Button text content */}
        <span className={styles.content}>
          {children}
        </span>
        
        {/* Right icon */}
        {rightIcon && !loading && (
          <span className={styles.rightIcon}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Export default
export default Button;

// Additional utility functions for button variants
export const getButtonVariantClass = (variant: ButtonVariant, theme: ButtonTheme) => {
  return `${styles[`variant-${variant}`]} ${styles[`theme-${theme}`]}`;
};

export const getButtonSizeClass = (size: ButtonSize) => {
  return styles[`size-${size}`];
};

// Button group component for related buttons
export interface ButtonGroupProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  spacing?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  spacing = 'medium',
  className = ''
}) => {
  const groupClasses = [
    styles.buttonGroup,
    styles[`orientation-${orientation}`],
    styles[`spacing-${spacing}`],
    className
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={groupClasses} role="group">
      {children}
    </div>
  );
};

ButtonGroup.displayName = 'ButtonGroup';
