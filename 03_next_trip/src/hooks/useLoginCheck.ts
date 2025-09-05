'use client';

import { useRouter } from 'next/navigation';

export const useLoginCheck = () => {
  const router = useRouter();

  const loginCheckFn = () => {
    // CHECK: build error
    // alert('로그인을 먼저 해 주세요!');
    router.push('/auth/login');
  };

  return {
    loginCheck: loginCheckFn,
  };
};
