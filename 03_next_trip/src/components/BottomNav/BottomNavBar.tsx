import { MdChat, MdShoppingBag, MdPerson, MdVisibility } from 'react-icons/md';

import Link from 'next/link';

const NavItems = [
  {
    href: '/triptalk',
    icon: <MdChat />,
    label: '트립토크',
  },
  {
    href: '/purchase',
    icon: <MdShoppingBag />,
    label: '숙박권 구매',
  },
  {
    href: '/mypage',
    icon: <MdPerson />,
    label: '마이페이지',
  },
  {
    href: '/mypage/recent',
    icon: <MdVisibility />,
    label: '최근 본 상품',
  },
];

const activePath = '/triptalk';

export default function BottomNavBar() {
  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 w-full items-center justify-center bg-white tablet:flex'>
      <div className='mb-5 flex w-full max-w-7xl items-center justify-between self-stretch px-5 py-2'>
        {NavItems.map((item) => (
          <Link
            href={item.href}
            key={item.label}
            className={`inline-flex flex-1 flex-col items-center justify-start gap-1`}
          >
            <div className='relative h-6 w-6 overflow-hidden'>
              <div
                className={`${activePath === item.href ? 'text-stone-900' : 'text-stone-300'} absolute left-[2.50px] top-[2.50px] h-4 w-5 text-gray-300`}
              >
                {item.icon}
              </div>
            </div>
            <div
              className={`${activePath === item.href ? 'text-stone-900' : 'text-stone-300'} justify-start self-stretch text-center font-['Pretendard_Variable'] text-xs font-medium leading-3`}
            >
              {item.label}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
