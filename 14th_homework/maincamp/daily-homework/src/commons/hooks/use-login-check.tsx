'use client';

import { useRouter } from 'next/navigation';
import { useAlertModal } from '@/commons/components/modal';
import { useEffect, useRef, ComponentType } from 'react';
import { useAuthStore } from '../stores/auth-store';
import { tokenStorage } from '../libraries/token-storage';

export const useLoginCheck =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => {
    const router = useRouter();
    const hasChecked = useRef(false);
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
      if (hasChecked.current) return;
      hasChecked.current = true;

      // Access Token이 있는지 확인
      const accessToken = tokenStorage.getAccessToken();
      if (!accessToken) {
        alert('로그인 후 이용 가능합니다');
        router.push('/');
      }
    }, [router]);

    return <Component {...props} />;
  };
