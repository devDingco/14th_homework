'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './styles.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 변형 스타일
   * - 'primary': 주요 액션 버튼 (예: 등록, 제출)
   * - 'secondary': 보조 액션 버튼 (예: 취소)
   * - 'danger': 위험한 액션 버튼 (예: 삭제)
   * - 'ghost': 투명 배경 버튼
   * - 'dark': 검정 배경 버튼 (예: 검색)
   */
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'dark';

  /**
   * 버튼 크기
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * 전체 너비 사용 여부
   */
  fullWidth?: boolean;

  /**
   * 로딩 상태
   */
  loading?: boolean;
}

/**
 * 공통 Button 컴포넌트
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="medium">
 *   등록하기
 * </Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      fullWidth = false,
      loading = false,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classNames}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading ? <span className={styles.loadingSpinner}>로딩중...</span> : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
