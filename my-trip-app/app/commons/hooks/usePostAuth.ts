'use client';

import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';

interface PostAuthResult {
  isAuthorized: boolean;
  showUnauthorizedModal: boolean;
  checkPostAuthor: (postAuthorName: string) => boolean;
  closeUnauthorizedModal: () => void;
}

export function usePostAuth(): PostAuthResult {
  const { user, isLoggedIn } = useAuth();
  const [showUnauthorizedModal, setShowUnauthorizedModal] = useState(false);

  const checkPostAuthor = useCallback((postAuthorName: string): boolean => {
    // 로그인하지 않은 경우
    if (!isLoggedIn || !user) {
      setShowUnauthorizedModal(true);
      return false;
    }

    // 작성자가 현재 사용자와 다른 경우
    if (user.name !== postAuthorName) {
      setShowUnauthorizedModal(true);
      return false;
    }

    return true;
  }, [isLoggedIn, user]);

  const closeUnauthorizedModal = useCallback(() => {
    setShowUnauthorizedModal(false);
  }, []);

  return {
    isAuthorized: isLoggedIn && !!user,
    showUnauthorizedModal,
    checkPostAuthor,
    closeUnauthorizedModal,
  };
}
