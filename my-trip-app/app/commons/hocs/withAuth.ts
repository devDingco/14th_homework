'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tokenStorage } from '../utils/token';

export function withAuth<P extends object>(Component: React.ComponentType<P>): React.ComponentType<P> {
  const AuthenticatedComponent: React.FC<P> = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = tokenStorage.get();
      if (!token) {
        router.push('/auth');
        return;
      }
    }, [router]);

    return React.createElement(Component, props);
  };

  // 컴포넌트 이름 설정 (디버깅용)
  AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`;

  return AuthenticatedComponent;
}