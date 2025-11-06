'use client';

import React from 'react';
import Banner from './banner';
import Nav from './nav';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const pathname = usePathname();
  const hideBanner =
    pathname === '/mypage' ||
    pathname === '/boards/new' ||
    pathname?.includes('/edit');
  const showBanner = !hideBanner;

  return (
    <>
      <Nav />
      {showBanner && <Banner />}
      {children}
    </>
  );
}
