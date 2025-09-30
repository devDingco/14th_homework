"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "./queires";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function NavigationComponent() {
  const router = useRouter();
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  const [hasToken, setHasToken] = useState();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setHasToken(true);
  }, []);

  const isLoggedIn = !!data?.fetchUserLoggedIn || hasToken;

  const onClickLogin = () => {
    router.push("/auth/signin");
  };
  const onClickHomepage = () => {
    router.push("/boards");
  };
  return (
    <>
      <div className={styles.navigation__layout}>
        <div className={styles.navigation}>
          <div className={styles.navigation__left}>
            <button onClick={onClickHomepage}>
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
                className={styles.navigation__left__menu__size}
                onClick={onClickHomepage}
              >
                트립토크
              </button>
              <button className={styles.navigation__left__menu__size}>숙박권 구매</button>
              <button className={styles.navigation__left__menu__size}>마이페이지</button>
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
              <button className={styles.loginButton} onClick={onClickLogin}>
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
