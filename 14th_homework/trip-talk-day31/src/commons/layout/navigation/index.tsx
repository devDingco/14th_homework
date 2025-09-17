"use client";
import Image from "next/image";
import styles from "./styles.module.css";
export default function Navigation() {
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
          <div>트립토크</div>
          <div>숙박권 구매</div>
          <div>마이페이지</div>
        </div>
        <div className={styles.프로필}>
          <Image
            src={"/images/profile.png"}
            alt="프로필"
            width={40}
            height={40}
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
