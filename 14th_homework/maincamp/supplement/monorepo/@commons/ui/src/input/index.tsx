'use client';

import { InputHTMLAttributes, forwardRef, useState } from 'react';
import styles from './styles.module.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * 입력 필드 라벨
   */
  label?: string;

  /**
   * 필수 입력 필드 여부
   */
  required?: boolean;

  /**
   * 에러 메시지
   */
  error?: string;

  /**
   * 헬퍼 텍스트
   */
  helperText?: string;

  /**
   * 입력 필드 크기
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * 전체 너비 사용 여부
   */
  fullWidth?: boolean;

  /**
   * 입력 필드 변형 스타일
   */
  variant?: 'default' | 'search';

  /**
   * 아이콘 (React Node)
   */
  icon?: React.ReactNode;
}

/**
 * 공통 Input 컴포넌트
 *
 * @example
 * ```tsx
 * <Input
 *   label="작성자"
 *   placeholder="작성자 명을 입력해 주세요."
 *   required
 *   error={errors.writer}
 * />
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required = false,
      error,
      helperText,
      size = 'medium',
      fullWidth = true,
      variant = 'default',
      icon,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const inputWrapperClassNames = [styles.inputWrapper, fullWidth && styles.fullWidth]
      .filter(Boolean)
      .join(' ');

    const inputContainerClassNames = [
      variant === 'search' ? styles.searchContainer : '',
      error && styles.error,
      disabled && styles.disabled,
      isFocused && styles.focused,
    ]
      .filter(Boolean)
      .join(' ');

    const inputClassNames = [
      variant === 'search' ? styles.searchInput : styles.input,
      !icon && styles[size],
      !icon && fullWidth && styles.fullWidth,
      !icon && error && styles.error,
      !icon && disabled && styles.disabled,
      !icon && isFocused && styles.focused,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputElement = (
      <input
        ref={ref}
        id={inputId}
        className={icon ? styles.searchInput : inputClassNames}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        {...props}
      />
    );

    return (
      <div className={inputWrapperClassNames}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}> *</span>}
          </label>
        )}
        {icon ? (
          <div className={inputContainerClassNames}>
            {icon}
            {inputElement}
          </div>
        ) : (
          inputElement
        )}
        {error && (
          <p id={`${inputId}-error`} className={styles.errorText}>
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
