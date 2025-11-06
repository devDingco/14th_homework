import styles from './styles.module.css';
import Image from 'next/image';

export default function MyPage() {
  return (
    <div className={styles.container}>
      <div className={styles.gap}></div>
      <header className={styles.header}>마이 페이지</header>
      <div className={styles.gap}></div>

      {/* 사용자 정보 배너 */}
      <div className={styles.banner}>
        <div className={styles.bannerTitle}>내 정보</div>

        {/* 프로필 섹션 */}
        <div className={styles.profileSection}>
          <div className={styles.profileImage}></div>
          <span className={styles.profileName}>김상훈</span>
          <Image
            src="/icons/down-arrow.svg"
            alt="dropdown"
            width={24}
            height={24}
            className={styles.dropdownIcon}
          />
        </div>

        <div className={styles.divider}></div>

        {/* 포인트 섹션 */}
        <div className={styles.pointSection}>
          <div className={styles.pointIcon}>P</div>
          <div className={styles.pointValue}>
            <span className={styles.pointAmount}>23,000</span>
            <span className={styles.pointUnit}>P</span>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* 메뉴 탭 섹션 */}
        <div className={styles.menuTabs}>
          <button className={`${styles.menuTab} ${styles.menuTabActive}`}>
            거래내역&북마크
            <Image
              src="/icons/right-arrow.svg"
              alt="arrow"
              width={20}
              height={20}
              className={styles.arrowIcon}
            />
          </button>
          <button className={styles.menuTab}>
            포인트 사용 내역
            <Image
              src="/icons/right-arrow.svg"
              alt="arrow"
              width={20}
              height={20}
              className={styles.arrowIcon}
            />
          </button>
          <button className={styles.menuTab}>
            비밀번호 변경
            <Image
              src="/icons/right-arrow.svg"
              alt="arrow"
              width={20}
              height={20}
              className={styles.arrowIcon}
            />
          </button>
        </div>
      </div>

      <div className={styles.gap}></div>

      {/* Nav - 탭 네비게이션 */}
      <nav className={styles.nav}>
        <button className={`${styles.navTab} ${styles.navTabActive}`}>
          나의 상품
        </button>
        <button className={styles.navTab}>
          북마크
        </button>
      </nav>

      <div className={styles.gapSmall}></div>

      {/* Search Bar */}
      <div className={styles.searchBarContainer}>
        <div className={styles.searchBar}>
          <div className={styles.searchIcon}>🔍</div>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="필요한 내용을 검색해 주세요."
          />
        </div>
        <button className={styles.searchButton}>검색</button>
      </div>

      <div className={styles.gapSmall}></div>
      <main className={styles.main}>
        <div className={styles.tableContainer}>
          {/* 헤더 행 */}
          <div className={styles.tableHeader}>
            <div className={styles.headerNumber}>번호</div>
            <div className={styles.headerProductName}>상품 명</div>
            <div className={styles.headerPrice}>판매가격</div>
            <div className={styles.headerDate}>날짜</div>
          </div>

          {/* 데이터 행들 */}
          <div className={styles.tableBody}>
            <div className={`${styles.tableRow} ${styles.tableRowInactive}`}>
              <div className={styles.cellNumber}>243</div>
              <div className={styles.cellProductName}>
                <span className={styles.productNameInactive}>파르나스 호텔 제주</span>
                <span className={styles.statusBadge}>판매 완료</span>
              </div>
              <div className={styles.cellPrice}>326,000원</div>
              <div className={styles.cellDate}>2024.12.16</div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.cellNumber}>243</div>
              <div className={styles.cellProductName}>
                <span className={styles.productNameActive}>파르나스 호텔 제주</span>
                <span className={styles.statusBadge}>판매 완료</span>
              </div>
              <div className={styles.cellPrice}>326,000원</div>
              <div className={styles.cellDate}>2024.12.16</div>
            </div>

            <div className={`${styles.tableRow} ${styles.tableRowInactive}`}>
              <div className={styles.cellNumber}>243</div>
              <div className={styles.cellProductName}>
                <span className={styles.productNameInactive}>파르나스 호텔 제주</span>
                <span className={styles.statusBadge}>판매 완료</span>
              </div>
              <div className={styles.cellPrice}>326,000원</div>
              <div className={styles.cellDate}>2024.12.16</div>
            </div>

            <div className={`${styles.tableRow} ${styles.tableRowInactive}`}>
              <div className={styles.cellNumber}>243</div>
              <div className={styles.cellProductName}>
                <span className={styles.productNameInactive}>파르나스 호텔 제주</span>
                <span className={styles.statusBadge}>판매 완료</span>
              </div>
              <div className={styles.cellPrice}>326,000원</div>
              <div className={styles.cellDate}>2024.12.16</div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.cellNumber}>243</div>
              <div className={styles.cellProductName}>
                <span className={styles.productNameActive}>파르나스 호텔 제주</span>
                <span className={styles.statusBadge}>판매 완료</span>
              </div>
              <div className={styles.cellPrice}>326,000원</div>
              <div className={styles.cellDate}>2024.12.16</div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.cellNumber}>243</div>
              <div className={styles.cellProductName}>
                <span className={styles.productNameActive}>파르나스 호텔 제주</span>
                <span className={styles.statusBadge}>판매 완료</span>
              </div>
              <div className={styles.cellPrice}>326,000원</div>
              <div className={styles.cellDate}>2024.12.16</div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.cellNumber}>243</div>
              <div className={styles.cellProductName}>
                <span className={styles.productNameActive}>파르나스 호텔 제주</span>
                <span className={styles.statusBadge}>판매 완료</span>
              </div>
              <div className={styles.cellPrice}>326,000원</div>
              <div className={styles.cellDate}>2024.12.16</div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.cellNumber}>243</div>
              <div className={styles.cellProductName}>
                <span className={styles.productNameActive}>파르나스 호텔 제주</span>
                <span className={styles.statusBadge}>판매 완료</span>
              </div>
              <div className={styles.cellPrice}>326,000원</div>
              <div className={styles.cellDate}>2024.12.16</div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.cellNumber}>243</div>
              <div className={styles.cellProductName}>
                <span className={styles.productNameActive}>파르나스 호텔 제주</span>
                <span className={styles.statusBadge}>판매 완료</span>
              </div>
              <div className={styles.cellPrice}>326,000원</div>
              <div className={styles.cellDate}>2024.12.16</div>
            </div>

            <div className={styles.tableRow}>
              <div className={styles.cellNumber}>243</div>
              <div className={styles.cellProductName}>
                <span className={styles.productNameActive}>파르나스 호텔 제주</span>
                <span className={styles.statusBadge}>판매 완료</span>
              </div>
              <div className={styles.cellPrice}>326,000원</div>
              <div className={styles.cellDate}>2024.12.16</div>
            </div>
          </div>
        </div>
      </main>
      <div className={styles.gap}></div>
    </div>
  );
}
