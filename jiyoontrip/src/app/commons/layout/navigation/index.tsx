"use client";

import Image from "next/image";
import styles from "./styles.module.css";
export default function NavigationComponent() {
  return (
    <>
      <div className={styles.navigation__layout}>
        <div className={styles.navigation}>
          <div className={styles.navigation__left}>
            <Image
              className={styles.logo}
              src="/images/logo.svg"
              alt="logo"
              width={0}
              height={0}
              sizes="100wv"
            />
            <div className={styles.navigation__left__menu}>
              <div className={styles.navigation__left__menu__size}>트립토크</div>
              <div className={styles.navigation__left__menu__size}>숙박권 구매</div>
              <div className={styles.navigation__left__menu__size}>마이페이지</div>
            </div>
          </div>
          <div className={styles.navigation__right}>
            <Image
              src="/icons/outline/profile.svg"
              alt="ProfileIcon"
              width={24}
              height={24}
              sizes="100vw"
            />
            <Image
              src="/icons/filled/down_arrow.svg"
              alt="ProfileIcon"
              width={24}
              height={24}
              sizes="100vw"
            />
          </div>
        </div>
      </div>
    </>
  );
}
