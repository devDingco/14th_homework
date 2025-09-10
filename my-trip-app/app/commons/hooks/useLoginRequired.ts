'use client';

import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';

interface LoginRequiredResult {
  showLoginRequiredModal: boolean;
  checkLoginRequired: () => boolean;
  closeLoginRequiredModal: () => void;
  handleLoginRequiredAction: (action: () => void) => void;
}

export function useLoginRequired(): LoginRequiredResult {
  const { isLoggedIn } = useAuth();
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false);
  const router = useRouter();

  const checkLoginRequired = useCallback((): boolean => {
    if (!isLoggedIn) {
      setShowLoginRequiredModal(true);
      return false;
    }
    return true;
  }, [isLoggedIn]);

  const closeLoginRequiredModal = useCallback(() => {
    setShowLoginRequiredModal(false);
  }, []);

  const handleLoginRequiredAction = useCallback((action: () => void) => {
    if (checkLoginRequired()) {
      action();
    }
  }, [checkLoginRequired]);

  return {
    showLoginRequiredModal,
    checkLoginRequired,
    closeLoginRequiredModal,
    handleLoginRequiredAction,
  };
}
