const navList = [
  { name: '트립토크', link: 'trip-talk' },
  { name: '숙박권 구매', link: 'purchase' },
  { name: '마이 페이지', link: 'my-page' },
];

import Logo from './../assets/logo.svg';

export default function Header() {
  return (
    <>
      <header className='max-w-7xl w-full h-20 items-center justify-between flex'>
        <div className='flex gap-6'>
          {/* LOGO */}
          <img src={Logo} alt='Logo' />
          {/* NaVBar */}
          <nav>
            <ul className='flex gap-4'>
              {navList.map((item) => (
                <li key={item.name}>
                  <a className='text-xl p-2 font-bold' href={item.link}>
                    {item.name}
                  </a>
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
