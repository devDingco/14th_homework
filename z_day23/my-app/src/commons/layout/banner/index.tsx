"use client";

import styles from "./styles.module.css";

export default function Banner() {
  return (
    <>
      <header>
        <div className={styles.head}>
          <div className={styles.header}>
            <div className={styles.header_inside}>
              <div className={styles.header_left}>
                <div className={styles.logo_area}>
                  <img src="/images/logo.png" alt="" />
                </div>
                <div className={styles.tap}>
                  <div className={styles.triptalk}>트립토크</div>
                  <div className={styles.buyticket}>숙박권 구매</div>
                  <div className={styles.mypage}>마이 페이지</div>
                </div>
              </div>
              <div className={styles.header_right}>
                {/* <div className={styles.button}>
                  <div className={styles.left_icon}></div>
                  <div className={styles.right_icon}></div>
                </div> */}
                <div className={styles.profile}>
                  <div>
                    <img src="/images/profilehead.png" alt="" />
                  </div>

                  <div className={styles.down_arrow}>
                    <img src="/images/down_arrow.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
