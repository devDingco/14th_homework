"use client";

import "./header.css";
import "../../../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Header() {
  const [activeMenu, setActiveMenu] = useState("");
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleActive = (menuKey) => {
    setActiveMenu(menuKey);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };


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
        <button className="sign_in_button" onClick={handleLogin}>
          <label className="sign_in_button_text sb_14_24">로그인</label>
          <Image src="/icons/filled/right_icon.png" alt="right_arrow" width={24} height={24} className="arrow_right_icon"/>
        </button>
    </div>

    {isLoggedIn && (
      <div className="header_right_profile_container">
        <div className="user_profile_container">
          <Image src="/images/mobile/profile/img-8.png" alt="user_profile" width={40} height={40} className="user_profile_image"/>
          <Image src="/icons/filled/down_arrow.png" alt="down_arrow" width={24} height={24} className="arrow_down_icon"/>
        </div>
      </div>
    )}
  </header>;
}