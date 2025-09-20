'use client';

import { LOGO } from '@/assets/icons/icons';
// import InputBox from '@/components/common/InputBox';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className='flex w-full flex-col items-center justify-center'>
      <div className='flex w-full flex-col items-center gap-6'>
        <Image className='h-[80px] w-[120px]' src={LOGO} alt='Logo' />
        <div className="justify-start text-center font-['Pretendard_Variable'] text-base font-semibold leading-normal text-black">
          트립트립에 오신걸 환영합니다.
        </div>

        <div className='flex w-full flex-col items-center'>
          <div className="justify-start text-center font-['Pretendard_Variable'] text-xs font-medium leading-tight text-gray-800">
            트립트립에 로그인 하세요.
          </div>

          <div className='mt-10 flex w-full max-w-sm flex-col gap-3 px-5'>
            <input
              name='email'
              type='text'
              placeholder='이메일을 입력해 주세요.'
            />
            <input
              name='password'
              type='password'
              placeholder='비밀번호를 입력해 주세요.'
            />
          </div>
        </div>
      </div>

      <div className='mt-5 flex w-full max-w-sm flex-col gap-4 px-5'>
        <button className='w-full rounded-md bg-blue-500 py-2 text-white'>
          로그인
        </button>
        <button className='w-full rounded-md text-gray-700'>회원가입</button>
      </div>
    </main>
  );
}
