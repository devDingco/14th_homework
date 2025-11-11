"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "./queires";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ROUTES } from "../../../commons/constants/url";
export default function NavigationComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setHasToken(true);
  }, []);

  const isLoggedIn = !!data?.fetchUserLoggedIn || hasToken;

  const onClickLogin = () => {
    router.push(ROUTES.AUTH.SIGNIN);
  };
  const onClickHomepage = () => {
    router.push(ROUTES.BOARDS.LIST);
  };
  const onClickPurchase = () => {
    router.push(ROUTES.PURCHASE.LIST);
  };
  const onClickMypage = () => {
    router.push(ROUTES.MYPAGE.TRANSACTION_BOOKMARK);
  };

  const isActiveBoards = pathname === ROUTES.BOARDS.LIST || pathname.startsWith("/boards");
  const isActivePurchase = pathname === ROUTES.PURCHASE.LIST || pathname.startsWith("/purchase");
  const isActiveMypage = pathname.startsWith("/mypage");
  return (
    <>
      <div className={styles.navigation__layout} data-testid="navigation">
        <div className={styles.navigation}>
          <div className={styles.navigation__left}>
            <button onClick={onClickHomepage} data-testid="nav-logo">
              <Image
                className={styles.logo}
                src="/images/logo.svg"
                alt="logo"
                width={0}
                height={0}
                sizes="100wv"
              />
            </button>
            <div className={styles.navigation__left__menu}>
              <button
                className={`${styles.navigation__left__menu__size} ${isActiveBoards ? styles.navigation__left__menu__size__active : ""}`}
                onClick={onClickHomepage}
                data-testid="nav-boards"
              >
                트립토크
              </button>
              <button
                className={`${styles.navigation__left__menu__size} ${isActivePurchase ? styles.navigation__left__menu__size__active : ""}`}
                onClick={onClickPurchase}
                data-testid="nav-purchase"
              >
                숙박권 구매
              </button>
              <button
                className={`${styles.navigation__left__menu__size} ${isActiveMypage ? styles.navigation__left__menu__size__active : ""}`}
                onClick={onClickMypage}
                data-testid="nav-mypage"
              >
                마이페이지
              </button>
            </div>
          </div>
          <div className={styles.navigation__right}>
            {isLoggedIn ? (
              <>
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
              </>
            ) : (
              <button className={styles.loginButton} onClick={onClickLogin} data-testid="nav-login">
                로그인
                <Image
                  src="/icons/outline/whiterighticon.svg"
                  alt="rightArrow"
                  width={24}
                  height={24}
                  sizes="100vw"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
