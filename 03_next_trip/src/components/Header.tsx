const navList = [
  { name: '트립토크', link: '/trip-talk' },
  { name: '숙박권 구매', link: '/purchase' },
  { name: '마이 페이지', link: '/my-page' },
];

import Image from 'next/image';
import Logo from '@/assets/logo.svg';
import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className='top-0 flex h-20 w-full max-w-7xl items-center justify-between'>
        <div className='flex gap-6'>
          {/* LOGO */}
          <Link href='/'>
            <Image src={Logo} alt='Logo' />
          </Link>
          {/* NaVBar */}
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
    </>
  );
}
