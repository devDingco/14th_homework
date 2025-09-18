const navList = [
  { name: '트립토크', link: '/trip-talk' },
  { name: '숙박권 구매', link: '/purchase' },
  { name: '마이 페이지', link: '/my-page' },
];

import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import Link from 'next/link';
import { Ioutline_login } from '@/assets/icons/icons';

export default function Header() {
  return (
    <div className='fixed left-0 right-0 top-0 z-50 items-center justify-center bg-white tablet:flex'>
      <header className='flex h-12 max-w-7xl items-center justify-between px-5 tablet:w-full desktop:hidden'>
        {/* LOGO */}
        <Link href='/'>
          {/* <Image src={Logo} alt='Logo' /> */}
          <span>트립토크</span>
        </Link>
        <Link href='/login' className='flex gap-1'>
          <span>로그인</span>
          <Image src={Ioutline_login} alt='login' />
        </Link>
      </header>
      <header className='top-0 hidden h-12 max-w-7xl items-center justify-between tablet:h-20 tablet:w-full desktop:flex'>
        <div className='flex gap-6'>
          {/* LOGO */}
          <Link href='/'>
            <Image src={Logo} alt='Logo' />
          </Link>
          {/* Modile NaVBar */}
          <nav className='desktop:hidden'></nav>
          {/* Desktop NaVBar */}
          <nav>
            <ul className='flex gap-4'>
              {navList.map((item) => (
                <li key={item.name}>
                  <Link className='p-2 text-xl font-bold' href={item.link}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        {/* User Profile */}
        <div id='user-profile'>User Profile</div>
      </header>
    </div>
  );
}
