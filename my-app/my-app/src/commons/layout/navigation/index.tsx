"use client";
import styles from "./styles.module.css";
import { useNavigation } from "./hook";
import downArrow from "./assets/down_arrow.svg";
import profileImg from "./assets/img.svg";
import tripImg from "./assets/logo.svg";
import Image from "next/image";
export default function Navigation() {
  const { onClickBoardsPage } = useNavigation();
  return (
    <>
      <div className={styles.headerBody}>
        <div className={styles.headerFrame}>
          <div className={styles.headerTap}>
            <div className={styles.header_logo}>
              <Image src={tripImg} alt="tripImg" />
            </div>
            <div
              className={styles.header_boardsPage}
              onClick={onClickBoardsPage}
            >
              트립토크
            </div>
            <div className={styles.header_voucherPurchase}>숙박권 구매</div>
            <div className={styles.header_myPage}>마이페이지</div>
          </div>
          <div className={styles.header_profile}>
            <Image
              src={profileImg}
              alt="profileImg"
              className={styles.header_profileIcon}
            />
            <Image
              src={downArrow}
              alt="downArrow"
              className={styles.header_profileArrow}
            />
          </div>
        </div>
      </div>
    </>
  );
}
