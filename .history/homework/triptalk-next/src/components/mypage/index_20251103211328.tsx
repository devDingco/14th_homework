'use client';

import Image from 'next/image';
import styles from './styles.module.css';

export default function MyPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>마이 페이지</h1>

      <div className={styles.contentWrapper}>
        <div className={styles.userInfoCard}>
          <h2 className={styles.sectionTitle}>내 정보</h2>

          <div className={styles.profileSection}>
            <div className={styles.profileImageWrapper}>
              <Image
                src="/icons/profile.svg"
                alt="프로필"
                width={40}
                height={40}
                className={styles.profileImage}
              />
            </div>
            <span className={styles.profileName}>김상훈</span>
            <div className={styles.dropdownIcon}>
              <Image
                src="/icons/arrow.png"
                alt="드롭다운"
                width={24}
                height={24}
              />
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.pointSection}>
            <div className={styles.pointIcon}>
              <Image src="/icons/good.png" alt="포인트" width={24} height={24} />
            </div>
            <div className={styles.pointValue}>
              <span className={styles.pointAmount}>23,000</span>
              <span className={styles.pointUnit}>P</span>
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.tabSection}>
            <div className={`${styles.tab} ${styles.tabActive}`}>
              <span className={styles.tabText}>거래내역&북마크</span>
              <Image
                src="/icons/right-arrow.svg"
                alt="화살표"
                width={20}
                height={20}
              />
            </div>
            <div className={styles.tab}>
              <span className={styles.tabText}>포인트 사용 내역</span>
              <Image
                src="/icons/right-arrow.svg"
                alt="화살표"
                width={20}
                height={20}
              />
            </div>
            <div className={styles.tab}>
              <span className={styles.tabText}>비밀번호 변경</span>
              <Image
                src="/icons/right-arrow.svg"
                alt="화살표"
                width={20}
                height={20}
              />
            </div>
          </div>
        </div>

        <div className={styles.productSection}>
          <div className={styles.productTabBar}>
            <button className={`${styles.productTab} ${styles.productTabActive}`}>
              나의 상품
            </button>
            <button className={styles.productTab}>북마크</button>
          </div>

          <div className={styles.searchArea}>
            <div className={styles.searchBar}>
              <Image
                src="/icons/list.png"
                alt="검색"
                width={24}
                height={24}
                className={styles.searchIcon}
              />
              <input
                type="text"
                placeholder="필요한 내용을 검색해 주세요."
                className={styles.searchInput}
              />
            </div>
            <button className={styles.searchButton}>검색</button>
          </div>

          <div className={styles.tableWrapper}>
            <div className={styles.tableContainer}>
              <div className={styles.tableHeader}>
                <div className={styles.columnNumber}>번호</div>
                <div className={styles.columnProduct}>상품 명</div>
                <div className={styles.columnPrice}>판매가격</div>
                <div className={styles.columnDate}>날짜</div>
              </div>

              <div className={styles.tableBody}>
                {[...Array(10)].map((_, index) => (
                  <div
                    key={index}
                    className={`${styles.tableRow} ${
                      index === 0 || index === 2 || index === 3 || index === 4
                        ? styles.tableRowInactive
                        : ''
                    }`}
                  >
                    <div className={styles.columnNumber}>
                      <span className={styles.cellNumber}>243</span>
                    </div>
                    <div className={styles.columnProduct}>
                      <span
                        className={`${styles.cellProductName} ${
                          index === 0 || index === 2 || index === 3 || index === 4
                            ? styles.cellProductNameInactive
                            : ''
                        }`}
                      >
                        파르나스 호텔 제주
                      </span>
                      <span className={styles.cellStatus}>판매 완료</span>
                    </div>
                    <div className={styles.columnPrice}>
                      <span className={styles.cellPrice}>326,000원</span>
                    </div>
                    <div className={styles.columnDate}>
                      <span className={styles.cellDate}>2024.12.16</span>
                    </div>
                    <button className={styles.deleteButton}>
                      <Image
                        src="/icons/delete.png"
                        alt="삭제"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
