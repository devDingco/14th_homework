export interface LoadingSpinnerProps {
  /** 스피너 크기 */
  size?: 'small' | 'medium' | 'large';
  /** 로딩 텍스트 */
  text?: string;
  /** 텍스트 표시 여부 */
  showText?: boolean;
  /** 커스텀 클래스명 */
  className?: string;
  /** 스피너 색상 테마 */
  theme?: 'primary' | 'secondary' | 'white';
}

export type LoadingSpinnerSize = 'small' | 'medium' | 'large';
export type LoadingSpinnerTheme = 'primary' | 'secondary' | 'white';
