"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { NavigationProps, User } from "./types";
import { FETCH_USER_LOGGED_IN } from "./queries";
import { authManager } from "@/lib/auth";
import { FetchUserLoggedInDocument } from "@/commons/graphql/graphql";
import styles from "@/styles/header.module.css";

export default function Navigation(props: NavigationProps) {
  const { data, loading, error } = useQuery(FETCH_USER_LOGGED_IN, {
    skip: !authManager.isLoggedIn(), // 로그인 상태가 아닐 때는 쿼리 실행하지 않음
    errorPolicy: 'ignore' // 에러가 발생해도 무시 (로그아웃 상태일 수 있음)
  });

  // 로그인 상태 확인: authManager에 토큰이 있거나 GraphQL에서 사용자 정보를 성공적으로 가져온 경우
  const isLoggedIn = authManager.isLoggedIn() || (data?.fetchUserLoggedIn && !error);
  const user = data?.fetchUserLoggedIn;

  // 디버깅을 위한 로그
  console.log('Navigation Debug:', {
    authManagerToken: authManager.getToken(),
    authManagerIsLoggedIn: authManager.isLoggedIn(),
    graphqlData: data?.fetchUserLoggedIn,
    graphqlError: error,
    finalIsLoggedIn: isLoggedIn,
    user: user
  });

  return (
    <header className={styles.header}>
      <div className={styles.headerLogoAndNav}>
        <Image src="/images/logo_area.png" alt="Triptalk Logo" width={100} height={40} className={styles.headerLogo} />
        <nav className={styles.headerNav}>
          <a href="#">트립토크</a>
          <a href="#">숙박권 구매</a>
          <a href="#">마이 페이지</a>
        </nav>
      </div>
      
      {isLoggedIn && user ? (
        // 로그인 상태: 프로필 사진만 표시 (기존과 동일)
        <div className={styles.userProfile}>
          <Image 
            src={user.picture || "/images/profile_basic.png"} 
            alt="User Profile" 
            width={36} 
            height={36} 
            className={styles.userAvatar}
          />
        </div>
      ) : (
        // 로그아웃 상태: 로그인 버튼 표시
        <div className={styles.loginSection}>
          <Link href="/auth/login" className={styles.loginButton}>
            로그인
            <span className={styles.loginArrow}>→</span>
          </Link>
        </div>
      )}
    </header>
  );
}
