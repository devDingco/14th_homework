"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { NavigationProps } from "../../types";

export default function Navigation({ 
  isLoggedIn = false, 
  user, 
  onLogin, 
  onLogout 
}: NavigationProps) {
  return (
    <header className="header">
      <div className="header-logo-and-nav">
        <Image 
          src="/images/logo_area.png" 
          alt="Triptalk Logo" 
          width={70} 
          height={40} 
          className="header-logo" 
        />
        <nav className="header-nav">
          <a href="#">트립토크</a>
          <a href="#">숙박권 구매</a>
          <a href="#">마이 페이지</a>
        </nav>
      </div>
      
      {isLoggedIn ? (
        // 로그인 상태: 프로필 사진 표시
        <div className="user-profile">
          <Image 
            src={user?.picture || "/images/profile_basic.png"} 
            alt="User Profile" 
            width={36} 
            height={36} 
            className="user-avatar"
            onClick={onLogout}
          />
        </div>
      ) : (
        // 로그아웃 상태: 로그인 버튼 표시
        <div className="login-section">
          <Link href="/auth/login" className="login-button" onClick={onLogin}>
            로그인
            <span className="login-arrow">→</span>
          </Link>
        </div>
      )}
    </header>
  );
}
