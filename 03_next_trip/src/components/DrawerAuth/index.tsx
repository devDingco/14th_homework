'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { MdOutlineClose } from 'react-icons/md';
import Image from 'next/image';
import { Ioutline_login } from '@/assets/icons/icons';
import { useState } from 'react';
import Authform from '../authform';

export function DrawerAuth() {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onToggleOpen}>
      <DrawerTrigger asChild>
        <Button variant='ghost'>
          <span>로그인</span>
          <Image src={Ioutline_login} alt='login' />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto h-screen w-full max-w-sm'>
          <DrawerHeader className='flex items-center justify-between'>
            <span>&nbsp;</span>
            <DrawerTitle>로그인 / 회원가입</DrawerTitle>
            <span>
              <DrawerClose asChild>
                <MdOutlineClose className='h-6 w-6' />
              </DrawerClose>
            </span>
          </DrawerHeader>
          {/* <LoginPage /> */}
          <Authform onToggleOpen={onToggleOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
