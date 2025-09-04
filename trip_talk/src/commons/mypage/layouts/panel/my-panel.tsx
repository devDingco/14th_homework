'use client';

import Image from 'next/image';
import './my-panel.css';

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function MyPanel() {
  const { user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const menuConfig = [
    {
      id: 'history&bookmark',
      label: '거래내역&북마크',
      defaultPath: '/mypage/history',
      paths: ['/mypage/bookmarks', '/mypage/history'],
    },
    {
      id: 'point',
      label: '포인트 사용 내역',
      defaultPath: '/mypage/point/all',
      paths: ['/mypage/point/all', '/mypage/point/charge', '/mypage/point/purchase', '/mypage/point/sales'],
    },
    {
      id: 'password',
      label: '비밀번호 변경',
      defaultPath: '/mypage/password',
      paths: ['/mypage/password'],
    },
  ];

  const getActivePanel = () => {
    return menuConfig.find((menu) => menu.paths.some((path) => pathname.startsWith(path)))?.id || 'history&bookmark';
  };

  const activePanel = getActivePanel();

  return (
    <div className="my_panel">
      <div className="my_panel_title sb_18_24">내 정보</div>
      <div className="my_panel_profile">
        <Image src={user?.picture ? user.picture : '/icons/profile_none.png'} alt="profile" width={40} height={40} />
        <span className="me_16_20">{user?.name}</span>
      </div>
      <hr className="my_panel_divider" />
      <div className="my_panel_points">
        <Image src="/icons/point.png" alt="point" width={24} height={24} />
        <span className="me_20_24">{user?.userPoint?.amount.toLocaleString()}P</span>
      </div>
      <hr className="my_panel_divider" />
      <div className="my_panel_list">
        {menuConfig.map((menu) => (
          <div
            key={menu.id}
            className={`my_panel_item ${activePanel === menu.id ? 'active sb_16_24' : 'r_16_24'}`}
            onClick={() => router.push(menu.defaultPath)}
          >
            {menu.label}
          </div>
        ))}
      </div>
    </div>
  );
}
