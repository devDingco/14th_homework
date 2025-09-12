import React from "react";
import Image from "next/image";
import { NavigationProps } from "./types";

export default function Navigation(props: NavigationProps) {
  return (
    <header className="header">
      <div className="header-logo-and-nav">
        <Image src="/images/logo_area.png" alt="Triptalk Logo" width={100} height={40} className="header-logo" />
        <nav className="header-nav">
          <a href="#">트립토크</a>
          <a href="#">숙박권 구매</a>
          <a href="#">마이 페이지</a>
        </nav>
      </div>
      <div className="user-profile">
        <Image src="/images/profile_basic.png" alt="User Profile" width={36} height={36} />
      </div>
    </header>
  );
}
