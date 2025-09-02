import PointTransactionLayout from '@/commons/mypage/layouts/point&transaction/point-transaction-layout';
import { ReactNode } from 'react';

interface MyPageLayoutProps {
  children: ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return (
    <div>
      <PointTransactionLayout />
      {children}
    </div>
  );
}
