"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      email
      name
      picture
    }
  }
`;
export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [login, setLogin] = useState(false);
  const { data } = useQuery(FETCH_USER_LOGGED_IN);
  useEffect(() => {
    if (data) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [data]);
  const onClickMove = () => {
    router.push("/");
  };
  const onClickBoard = () =>{
    router.push("/boards")
  }
  const onClickMypage = () =>{
    router.push("/mypage")
  }
  const onClickAccommodation = () =>{
    router.push("/accommodation")
  }
  return (
    <>
      <div className={styles.네비게이션}>
        <div className={styles.페이지선택}>
          <Image
            src={"/images/logo.png"}
            alt="로고"
            width={51.52}
            height={32}
          />
          <div 
            onClick={onClickBoard} 
            className={`${styles.탭} ${pathname?.startsWith('/boards') ? styles.활성탭 : ''}`}
          >
            트립토크
          </div>
          <div 
            onClick={onClickAccommodation} 
            className={`${styles.탭} ${pathname?.startsWith('/accommodation') ? styles.활성탭 : ''}`}
          >
            숙박권 구매
          </div>
          <div 
            onClick={onClickMypage} 
            className={`${styles.탭} ${pathname?.startsWith('/mypage') ? styles.활성탭 : ''}`}
          >
            마이페이지
          </div>
        </div>
        <Image
          src={"/images/button_login.png"}
          alt="로그인"
          width={93}
          height={40}
          className={`${styles.login} ${login ? "" : styles.show}`}
          onClick={onClickMove}
        />
        <div className={`${styles.프로필} ${login ? styles.show : ""}`}>
          <Image
            src={"/images/profile.png"}
            alt="프로필"
            width={40}
            height={40}
            // className={styles.profile}
          />
          <Image
            src={"/images/down_arrow.png"}
            alt="드롭다운"
            width={24}
            height={24}
          />
        </div>
      </div>
    </>
  );
}
