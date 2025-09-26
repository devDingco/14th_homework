"use client";

import BoardsWrite from "@/components/boards-write/";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authManager } from "@/lib/auth";

/**
 * 게시글 등록 페이지
 * 로그인한 사용자만 접근 가능
 */
export default function BoardsNewPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        // authManager에서 토큰 초기화
        authManager.initializeToken();
        
        if (authManager.isLoggedIn()) {
          setIsAuthenticated(true);
        } else {
          // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('인증 확인 실패:', error);
        router.push('/auth/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // 로딩 중일 때는 로딩 표시
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        로그인 상태를 확인하는 중...
      </div>
    );
  }

  // 인증되지 않은 경우 아무것도 렌더링하지 않음 (리다이렉트 중)
  if (!isAuthenticated) {
    return null;
  }

  // 인증된 사용자만 게시글 작성 컴포넌트 표시
  return (
    <BoardsWrite isEdit={false} />
  );
}
