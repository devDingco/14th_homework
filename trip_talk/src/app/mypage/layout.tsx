import MyPanel from '../../commons/mypage/layouts/panel/my-panel';
import { ReactNode } from 'react';

interface MypageLayoutProps {
  children: ReactNode;
}

export default function MypageLayout({ children }: MypageLayoutProps) {
  return (
    <div className="container">
      <h1 className="b_28_36" style={{ margin: '2.5rem 0' }}>
        마이페이지
      </h1>
      <MyPanel />
      <div>{children}</div>
    </div>
  );
}
