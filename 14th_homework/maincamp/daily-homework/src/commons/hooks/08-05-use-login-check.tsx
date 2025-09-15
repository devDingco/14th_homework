'use client';

import { useRouter } from 'next/navigation';
import { useAlertModal } from '@/commons/components/modal';

export const useLoginCheck = () => {
  const router = useRouter();
  const { showAlert, AlertModalComponent } = useAlertModal();

  const loginCheck = () => {
    // 로그인 검증

    // 로그인 검증 실패 시 알림
    showAlert('로그인을 먼저 해 주세요!');
    router.push('로그인페이지로 이동');
  };

  return {
    loginCheck,
    AlertModalComponent,
  };
};
