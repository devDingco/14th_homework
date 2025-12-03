import { ReactNode } from 'react';
import styles from './styles.module.css';

interface ErrorStateProps {
  message?: string;
  children?: ReactNode;
}

export default function ErrorState({
  message = '오류가 발생했습니다.',
  children,
}: ErrorStateProps) {
  if (children) {
    return <>{children}</>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.message}>{message}</div>
    </div>
  );
}
