import "./LoadingSpinner.css";

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

/**
 * 재사용 가능한 로딩 스피너 컴포넌트
 * 
 * @example
 * // 기본 사용법
 * <LoadingSpinner />
 * 
 * @example
 * // 크기와 텍스트 커스터마이징
 * <LoadingSpinner size="large" text="데이터를 불러오는 중..." />
 * 
 * @example
 * // 텍스트 없이 스피너만
 * <LoadingSpinner size="small" showText={false} />
 */
export default function LoadingSpinner({ 
  size = 'medium', 
  text = '로딩 중...', 
  showText = true,
  className = '',
  theme = 'primary'
}: LoadingSpinnerProps) {
  return (
    <div className={`loading_spinner_container ${size} ${theme} ${className}`}>
      <div className="loading_spinner">
        <div className="spinner_ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      {showText && text && <p className="loading_text">{text}</p>}
    </div>
  );
}
