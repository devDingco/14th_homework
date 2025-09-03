'use client';

import Image from 'next/image';
import './my-menu.css';
import Icon from '@utils/iconColor';
import { MenuId, MyMenuProps, MenuConfig } from '@lib/types/mypage';

export default function MyMenu({ activeMenu, onMenuChange }: MyMenuProps) {
  const menuConfig: MenuConfig[] = [
    {
      id: 'history&bookmark',
      label: '거래내역&북마크',
    },
    {
      id: 'point',
      label: '포인트 사용 내역',
    },
    {
      id: 'password',
      label: '비밀번호 변경',
    },
  ];

  return (
    <div className="my_menu">
      <div className="my_menu_title sb_18_24">내 정보</div>
      <div className="my_menu_profile">
        <Image src="/images/mobile/profile/img-8.png" alt="profile" width={40} height={40} />
        <span className="me_16_20">김상훈</span>
      </div>
      <hr className="my_menu_divider" />
      <div className="my_menu_points">
        <Icon outline name="point" default className="point_icon"/>
        <span className="me_20_24">23,000P</span>
      </div>
      <hr className="my_menu_divider" />
      <div className="my_menu_list">
        {menuConfig.map((menu) => (
          <div
            key={menu.id}
            className={`my_menu_item ${activeMenu === menu.id ? 'active sb_16_24' : 'r_16_24'}`}
            onClick={() => onMenuChange(menu.id)}
          >
            {menu.label}
            <Icon outline name="right_arrow" default className="right_arrow_icon"/>
          </div>
        ))}
      </div>
    </div>
  );
}
