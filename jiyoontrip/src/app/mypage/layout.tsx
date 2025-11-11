"use client";
import Image from "next/image";
import styles from "./styles.module.css";

export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.gap}></div>

      <div className={styles.mypageLabel}>
        <h1 className={styles.title}>마이 페이지</h1>
      </div>
      <div className={styles.gap}></div>
      <div className={styles.myprofile}>
        <div className={styles.userInfoBox}>
          <h2 className={styles.userInfoLabel}>내 정보</h2>
          <div className={styles.profileSection}>
            <div className={styles.profileImage}></div>
            <span className={styles.profileName}>김상훈</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.pointSection}>
            <Image src="/icons/outline/point.svg" alt="포인트" width={24} height={24} />
            <div className={styles.pointValue}>
              <span className={styles.pointNumber}>23,000</span>
              <span className={styles.pointUnit}>P</span>
            </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.menuSection}>
            <button className={`${styles.menuTab} ${styles.menuTabActive}`}>
              <span className={styles.menuTabText}>거래내역&북마크</span>
              <Image
                src="/icons/outline/right_arrow.svg"
                alt="이동"
                width={20}
                height={20}
              />
            </button>
            <button className={styles.menuTab}>
              <span className={styles.menuTabText}>포인트 사용 내역</span>
              <Image
                src="/icons/outline/right_arrow.svg"
                alt="이동"
                width={20}
                height={20}
              />
            </button>
            <button className={styles.menuTab}>
              <span className={styles.menuTabText}>비밀번호 변경</span>
              <Image
                src="/icons/outline/right_arrow.svg"
                alt="이동"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.gap}></div>
      {children}
    </div>
  );
}
