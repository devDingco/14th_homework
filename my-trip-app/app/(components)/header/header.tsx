"use client";

import "./header.css";
import "./header.tablet.css";
import "../../global.css";
import Image from "next/image";
import Link from "next/link";
import Icon from "@utils/iconColor";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { tokenStorage } from "../../commons/utils/token";
import { useAuth } from "../../commons/hooks/useAuth";

export default function Header() {
  const [activeMenu, setActiveMenu] = useState("");
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const { user, isLoggedIn, logout } = useAuth();
  
  const handleActive = useCallback((menuKey: string) => {
    setActiveMenu(menuKey);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    setIsProfileOpen(false);
  }, [logout]);

  const toggleProfile = useCallback(() => {
    setIsProfileOpen((v) => !v);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const node = profileRef.current;
      if (!node) return;
      const target = event.target as Node | null;
      if (target && !node.contains(target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        <Link href="/product" onClick={() => handleActive("voucher")}>
          <h1 className={`header_menu_item me_16_24 ${activeMenu === "voucher" ? "is-active" : ""}`}>숙박권 구매</h1>
        </Link>
        <Link href="/mypage" onClick={() => handleActive("mypage")}>
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

    {isLoggedIn && user && (
      <div className="header_right_profile_container" ref={profileRef}>
        <div className="user_profile_container" onClick={toggleProfile}>
          <Image 
            src={user.picture || "/images/mobile/profile/img-8.png"} 
            alt="user_profile" 
            width={40} 
            height={40} 
            className="user_profile_image"
            priority={false}
            loading="lazy"
          />
          <Icon filled name="down_arrow" black className="arrow_down_icon"/>
        </div>
        <div className={`profile_dropdown ${isProfileOpen ? "open" : ""}`}>
          <div className="profile_header">
            <Image 
              src={user.picture || "/images/mobile/profile/null.png"} 
              alt="user" 
              width={40} 
              height={40} 
            />
            <h2 className="me_16_24">{user?.name}</h2>
            <Icon filled name="up_arrow" black className="up_arrow_icon" onClick={toggleProfile} />
          </div>
          <div className="profile_divider"/>
          <div className="profile_row">
            <Icon outline name="point" default className="point_icon"/>
            <p className="me_16_24">
              {user.userPoint?.amount ? `${user.userPoint.amount.toLocaleString()} P` : '0 P'}
            </p>
          </div>
          <div className="profile_divider"/>
          <button className="profile_action">
            <Icon filled name="charge" default className="charge_icon"/>
            <span className="r_16_24">포인트 충전</span>
          </button>
          <button className="profile_action" onClick={handleLogout}>
            <Icon outline name="logout" default className="logout_icon"/>
            <span className="r_16_24">로그아웃</span>
          </button>
        </div>
      </div>
    )}
  </header>;
}