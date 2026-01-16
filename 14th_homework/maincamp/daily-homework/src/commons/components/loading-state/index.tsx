import { ReactNode } from 'react';
import styles from './styles.module.css';

interface LoadingStateProps {
  message?: string;
  children?: ReactNode;
}

export default function LoadingState({ message = '로딩 중...', children }: LoadingStateProps) {
  if (children) {
    return <>{children}</>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
    </div>
  );
}
