"use client";

import Image from "next/image";
import { DatePicker } from "antd";
import styles from "./styles.module.css";

export default function PurchaseList() {
  return (
    <div className={styles.container}>
      {/* Best Item Area */}
      <div className={styles.bestItemArea}>
        <h2 className={styles.title}>2024 끝여름 낭만있게 마무리 하고 싶다면?</h2>
        <div className={styles.carouselArea}>
          <div
            className={styles.accommodationCard}
            style={{ backgroundImage: "url(/images/a.png)" }}
          >
            <div className={styles.cardOverlay}>
              <div className={styles.bookmarkBadge}>
                <div className={styles.bookmarkBadgeContent}>
                  <Image
                    src="/icons/outline/bookmark.svg"
                    alt="북마크"
                    width={24}
                    height={24}
                  />
                  <span>24</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3>포항 : 당장 가고 싶은 숙소</h3>
                <p className={styles.description}>
                  살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                  쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여
                  자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리
                  얄라셩 얄라리 얄라
                </p>
                <div className={styles.priceArea}>
                  <span className={styles.price}>32,900</span>
                  <span className={styles.unit}>원</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.accommodationCard}
            style={{ backgroundImage: "url(/images/b.png)" }}
          >
            <div className={styles.cardOverlay}>
              <div className={styles.bookmarkBadge}>
                <div className={styles.bookmarkBadgeContent}>
                  <Image
                    src="/icons/outline/bookmark.svg"
                    alt="북마크"
                    width={24}
                    height={24}
                  />
                  <span>24</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3>강릉 : 마음까지 깨끗해지는 하얀 숙소</h3>
                <p className={styles.description}>
                  살어리 살어리랏다 강릉에 평생 살어리랏다
                </p>
                <div className={styles.priceArea}>
                  <span className={styles.price}>32,900</span>
                  <span className={styles.unit}>원</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.gap}></div>

      {/* Mini Banner */}
      <div className={styles.miniBanner}>
        <div className={styles.bannerContent}>
          <div className={styles.bannerImageLeft}>
            <Image
              src="/images/Solitary Contemplation Beneath Nature's Arch 1.png"
              alt="배너"
              width={640}
              height={240}
            />
          </div>
          <div className={styles.bannerTextArea}>
            <div className={styles.badgeGroup}>
              <div className={styles.badge}>&apos;솔로트립&apos; 독점 숙소</div>
              <div className={styles.badge}>9.24 얼리버드 오픈 예약</div>
            </div>
            <h2 className={styles.bannerTitle}>
              천만 관객이 사랑한
              <br />빌 페소 르꼬 전시회 근처 숙소 특가 예약
            </h2>
          </div>
        </div>
      </div>

      <div className={styles.gap}></div>

      {/* Main Area */}
      <div className={styles.main}>
        <h2 className={styles.mainTitle}>여기에서만 예약할 수 있는 숙소</h2>

        <div className={styles.tabsArea}>
          <button className={`${styles.tab} ${styles.tabActive}`}>예약 가능 숙소</button>
          <button className={styles.tab}>예약 마감 숙소</button>
        </div>

        <div className={styles.searchArea}>
          <div className={styles.searchRow}>
            <div className={styles.searchGroup}>
              <DatePicker.RangePicker
                className={styles.datePicker}
                placeholder={["YYYY.MM.DD", "YYYY.MM.DD"]}
                suffixIcon={
                  <Image
                    src="/icons/outline/calendar.svg"
                    alt="달력"
                    width={24}
                    height={24}
                  />
                }
              />
              <div className={styles.searchInputWrapper}>
                <Image
                  src="/icons/outline/search.svg"
                  alt="검색"
                  width={24}
                  height={24}
                  className={styles.searchIcon}
                />
                <input
                  type="text"
                  placeholder="제목을 검색해 주세요."
                  className={styles.searchInput}
                />
              </div>
              <button className={styles.searchButton}>검색</button>
            </div>
            <button className={styles.sellButton}>
              <Image
                src="/icons/outline/whitewrite.svg"
                alt="작성"
                width={24}
                height={24}
              />
              숙박권 판매하기
            </button>
          </div>
        </div>

        <div className={styles.filterArea}>
          <div className={styles.filterItem}>
            <Image
              src="/icons/outline/Singlepersonaccommodation.svg"
              alt="1인 전용"
              width={40}
              height={40}
            />
            <span>1인 전용</span>
          </div>
          <div className={styles.filterItem}>
            <Image
              src="/icons/outline/apartment.svg"
              alt="아파트"
              width={40}
              height={40}
            />
            <span>아파트</span>
          </div>
          <div className={styles.filterItem}>
            <Image src="/icons/outline/hotel.svg" alt="호텔" width={40} height={40} />
            <span>호텔</span>
          </div>
          <div className={styles.filterItem}>
            <Image src="/icons/outline/camp.svg" alt="캠핑" width={40} height={40} />
            <span>캠핑</span>
          </div>
          <div className={styles.filterItem}>
            <Image
              src="/icons/outline/room service.svg"
              alt="룸 서비스"
              width={40}
              height={40}
            />
            <span>룸 서비스 가능</span>
          </div>
          <div className={styles.filterItem}>
            <Image src="/icons/outline/fire.svg" alt="불멍" width={40} height={40} />
            <span>불멍</span>
          </div>
          <div className={styles.filterItem}>
            <Image src="/icons/outline/_spa.svg" alt="스파" width={40} height={40} />
            <span>반신욕&스파</span>
          </div>
          <div className={styles.filterItem}>
            <Image
              src="/icons/outline/house on the sea.svg"
              alt="바다 위 숙소"
              width={40}
              height={40}
            />
            <span>바다 위 숙소</span>
          </div>
          <div className={styles.filterItem}>
            <Image
              src="/icons/outline/planterior.svg"
              alt="플랜테리어"
              width={40}
              height={40}
            />
            <span>플랜테리어</span>
          </div>
        </div>

        <div className={styles.cardArea}>
          {[...Array(8)].map((_, index) => (
            <div key={index} className={styles.card}>
              <div
                className={styles.cardImageWrapper}
                style={{ backgroundImage: "url('/images/Rectangle 3011.png')" }}
              >
                <div className={styles.cardBookmark}>
                  <div className={styles.cardBookmarkContent}>
                    <Image
                      src="/icons/outline/bookmark.svg"
                      alt="북마크"
                      width={24}
                      height={24}
                    />
                    <span>24</span>
                  </div>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>
                  살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                  쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여
                  자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리
                  얄라셩 얄라리 얄라
                </h3>
                <p className={styles.cardSubtitle}>
                  살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                  쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여
                  자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리
                  얄라셩 얄라리 얄라
                </p>
                <div className={styles.tagArea}>
                  #6인 이하 #건식 사우나 #애견동반 가능
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.profileArea}>
                    <Image
                      src="/images/f.png"
                      alt="프로필"
                      width={24}
                      height={24}
                      className={styles.profileImg}
                    />
                    <span className={styles.profileName}>빈얀트리</span>
                  </div>
                  <div className={styles.cardPriceArea}>
                    <span className={styles.cardPrice}>32,900</span>
                    <span className={styles.cardUnit}>원</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.gapLast}></div>
    </div>
  );
}
