'use client';

import { useRouter } from 'next/navigation';
import { useAlertModal } from '@/commons/components/modal';
import { useEffect, useRef, ComponentType } from 'react';

export const useLoginCheck =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => {
    const router = useRouter();
    const hasChecked = useRef(false);

    useEffect(() => {
      if (hasChecked.current) return;
      hasChecked.current = true;

      if (localStorage.getItem('accessToken') === null) {
        alert('로그인 후 이용 가능합니다');
        router.push('/');
      }
    }, [router]);

    return <Component {...props} />;
  };
