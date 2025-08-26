'use client';

import Image from 'next/image';
import './header.css';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const menuList = [
    {
      name: '트립토크',
      link: '/',
    },
    {
      name: '숙박권 구매',
      link: '/booking',
    },
    {
      name: '마이 페이지',
      link: '/mypage',
    },
  ];

  return (
    <div className="container header">
      <div className="header_menu_container">
        <div className="header_logo"></div>
        <div className="header_menu">
          {menuList.map((menu) => (
            <span
              key={menu.link}
              className={`header_menu_item ${
                pathname === menu.link ||
                (menu.link !== '/' && pathname.startsWith(menu.link)) ||
                (menu.link === '/' && (pathname === '/' || pathname.startsWith('/board')))
                  ? 'active b_16_24'
                  : 'me_16_24'
              }`}
            >
              <a href={menu.link}>{menu.name}</a>
            </span>
          ))}
        </div>
      </div>
      <div className="header_login">
        <span className="sb_14_20" onClick={() => router.push('/signin')} style={{ cursor: 'pointer' }}>
          로그인
        </span>
        <Image src={'/icons/right_icon.png'} alt="login" width={20} height={20} />
      </div>
    </div>
  );
}
