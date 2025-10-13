import React from 'react';
import Image from 'next/image';
import styles from './styles.module.css';

export type SelectBoxVariant = 'primary' | 'secondary' | 'tertiary';
export type SelectBoxSize = 'small' | 'medium' | 'large';
export type SelectBoxTheme = 'light' | 'dark';

export interface SelectBoxProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: SelectBoxVariant;
  size?: SelectBoxSize;
  theme?: SelectBoxTheme;
  error?: boolean;
}

export const SelectBox = React.forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({ variant = 'primary', size = 'medium', theme = 'light', error = false, className, children, ...props }, ref) => {
    const containerClasses = [
      styles.container,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      styles[`theme-${theme}`],
      error && styles.error,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const selectClasses = [
      styles.select,
      styles[`size-${size}`],
    ]
      .filter(Boolean)
      .join(' ');

    const iconClasses = [
      styles.icon,
      styles[`theme-${theme}`],
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={containerClasses}>
        <select ref={ref} className={selectClasses} {...props}>
          {children}
        </select>
        <div className={iconClasses}>
          <Image 
            src="/icons/arrow_drop_down.svg" 
            alt="dropdown" 
            width={20} 
            height={20}
          />
        </div>
      </div>
    );
  }
);

SelectBox.displayName = 'SelectBox';

export default SelectBox;

