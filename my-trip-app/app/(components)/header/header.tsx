"use client";

import "./header.css";
import "../../global.css";
import Image from "next/image";
import Link from "next/link";
import Icon from "@utils/iconColor";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
export default function Header() {
  const [activeMenu, setActiveMenu] = useState("");
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const handleActive = (menuKey: string) => {
    setActiveMenu(menuKey);
  };



  useEffect(() => {
    // 토큰 기반 로그인 상태 동기화
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      setIsLoggedIn(!!token);
    }

    const handleClickOutside = (event: MouseEvent) => {
      const node = profileRef.current;
      if (!node) return;
      const target = event.target as Node | null;
      if (target && !node.contains(target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return <header className="header">
    <div className="header_left_container">
      <div className="header_logo">
        <Link href="/">
          <Image src="/logo/text-logo.png" alt="My Trip" width={52} height={32} className="header_logo_image"/>
        </Link>
      </div>
      <div className="header_menu">
        <Link href="/" onClick={() => handleActive("trip-talk")}>
          <h1 className={`header_menu_item me_16_24 ${activeMenu === "trip-talk" ? "is-active" : ""}`}>트립토크</h1>
        </Link>
        <Link href="/" onClick={() => handleActive("voucher")}>
          <h1 className={`header_menu_item me_16_24 ${activeMenu === "voucher" ? "is-active" : ""}`}>숙박권 구매</h1>
        </Link>
        <Link href="/" onClick={() => handleActive("mypage")}>
          <h1 className={`header_menu_item me_16_24 ${activeMenu === "mypage" ? "is-active" : ""}`}>마이 페이지</h1>
        </Link>
      </div>
    </div>
    <div className="header_right_button_container" style={{display: isLoggedIn ? "none" : "flex"}}>
        <button className="sign_in_button" onClick={() => router.push("/auth")}>
          <label className="sign_in_button_text sb_14_24">로그인</label>
          <Icon outline name="right_arrow" default className="arrow_right_icon"/>
        </button>
    </div>

    {isLoggedIn && (
      <div className="header_right_profile_container" ref={profileRef}>
        <div className="user_profile_container" onClick={() => setIsProfileOpen((v) => !v)}>
          <Image src="/images/mobile/profile/img-8.png" alt="user_profile" width={40} height={40} className="user_profile_image"/>
          <Icon filled name="down_arrow" black className="arrow_down_icon"/>
        </div>
        <div className={`profile_dropdown ${isProfileOpen ? "open" : ""}`}>
          <div className="profile_header">
            <Image src="/images/mobile/profile/null.png" alt="user" width={40} height={40} />
            <h2 className="b_18_24">김상훈</h2>
            <Icon filled name="up_arrow" black className="up_arrow_icon" onClick={() => setIsProfileOpen((v) => !v)} />
          </div>
          <div className="profile_divider"/>
          <div className="profile_row">
            <Icon outline name="point" default className="point_icon"/>
            <p className="me_16_24">23,000 P</p>
          </div>
          <div className="profile_divider"/>
          <button className="profile_action">
            <Icon filled name="charge" default className="charge_icon"/>
            <span className="r_16_24">포인트 충전</span>
          </button>
          <button className="profile_action" onClick={() => { localStorage.removeItem('auth_token'); setIsLoggedIn(false); }}>
            <Icon outline name="logout" default className="logout_icon"/>
            <span className="r_16_24">로그아웃</span>
          </button>
        </div>
      </div>
    )}
  </header>;
}