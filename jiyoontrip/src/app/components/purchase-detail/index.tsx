"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import usePurchaseModal from "./hooks/index.link.modal.hook";

export default function PurchaseDetail() {
  const { openPurchaseConfirmModal } = usePurchaseModal();

  return (
    <div className={styles.page} data-testid="purchase-detail-page">
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.titleTop}>
            <h1 className={styles.titleText}>포항 : 숙박권 명이 여기에 들어갑니다</h1>
            <div className={styles.titleIcons}>
              <Image
                src="/icons/outline/blackdelete.svg"
                alt="삭제"
                width={24}
                height={24}
              />
              <Image src="/icons/outline/link.svg" alt="링크" width={24} height={24} />
              <Image
                src="/icons/outline/location.svg"
                alt="위치"
                width={24}
                height={24}
              />
              <div className={styles.bookmarkBtn}>
                <Image
                  src="/icons/outline/bookmark.svg"
                  alt="북마크"
                  width={24}
                  height={24}
                />
                <span className={styles.bookmarkCount}>24</span>
              </div>
            </div>
          </div>
          <p className={styles.subtitle}>모던한 분위기의 감도높은 숙소</p>
          <p className={styles.hashtags}>#6인 이하 #건식 사우나 #애견동반 가능</p>
        </div>
        <div className={styles.gap24}></div>
        <div className={styles.purchaseArea}>
          <div className={styles.mainImage}>
            <Image
              src="/images/Rectangle 3011.png"
              alt="숙소 메인 이미지"
              width={640}
              height={480}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
          <div className={styles.thumbnailList}>
            <div className={styles.thumbnailWrapper}>
              <div className={styles.thumbnail}>
                <Image
                  src="/images/Rectangle 3028.png"
                  alt="숙소 이미지 1"
                  width={180}
                  height={136}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className={styles.thumbnail}>
                <Image
                  src="/images/Rectangle 3029.png"
                  alt="숙소 이미지 2"
                  width={180}
                  height={136}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className={styles.thumbnail}>
                <Image
                  src="/images/Rectangle 3030.png"
                  alt="숙소 이미지 3"
                  width={180}
                  height={136}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
              <div className={styles.thumbnail}>
                <Image
                  src="/images/Rectangle 3031.png"
                  alt="숙소 이미지 4"
                  width={180}
                  height={136}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                />
              </div>
            </div>
            <div className={styles.gradient}></div>
          </div>
          <div className={styles.purchaseBox}>
            <div className={styles.purchaseCard}>
              <div className={styles.priceInfo}>
                <div className={styles.priceRow}>
                  <p className={styles.priceAmount}>32,500</p>
                  <p className={styles.priceUnit}>원</p>
                </div>
                <div className={styles.purchaseNotice}>
                  <p className={styles.noticeText}>
                    숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
                  </p>
                  <p className={styles.noticeTextLight}>
                    상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.
                  </p>
                </div>
              </div>
              <button
                className={styles.purchaseButton}
                data-testid="purchase-button"
                onClick={openPurchaseConfirmModal}
              >
                구매하기
              </button>
            </div>
            <div className={styles.sellerCard}>
              <p className={styles.sellerTitle}>판매자</p>
              <div className={styles.sellerProfile}>
                <div className={styles.sellerImageWrapper}>
                  <Image
                    src="/images/h.png"
                    alt="판매자 프로필"
                    width={40}
                    height={40}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <p className={styles.sellerName}>김상훈</p>
                <Image
                  src="/icons/filled/down_arrow.svg"
                  alt="더보기"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gap40}></div>
        <div className={styles.divider}></div>
        <div className={styles.gap40}></div>
        <div className={styles.content}>
          <h2 className={styles.sectionTitle}>상세 설명</h2>
          <p className={styles.description}>
            살어리 살어리랏다 쳥산(靑山)애 살어리랏다 멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애
            살어리랏다 얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라
            새여 널라와 시름 한 나도 자고 니러 우니로라 리얄리 얄라셩 얄라리 얄라 가던 새
            가던 새 본다 믈 아래 가던 새 본다 잉무든 장글란 가지고 믈 아래 가던 새 본다
            얄리얄리 얄라셩 얄라리 얄라
            <br />
            <br />
            이링공 뎌링공 ᄒᆞ야 나즈란 디내와손뎌
            <br />
            오리도 가리도 업슨 바므란 ᄯᅩ 엇디 호리라
            <br />
            얄리얄리 얄라셩 얄라리 얄라
            <br />
            <br />
            어듸라 더디던 돌코 누리라 마치던 돌코
            <br />
            믜리도 괴리도 업시 마자셔 우니노라
            <br />
            얄리얄리 얄라셩 얄라리 얄라
            <br />
            <br />
            살어리 살어리랏다 바ᄅᆞ래 살어리랏다
            <br />
            ᄂᆞᄆᆞ자기 구조개랑 먹고 바ᄅᆞ래 살어리랏다
            <br />
            얄리얄리 얄라셩 얄라리 얄라
            <br />
            <br />
            가다가 가다가 드로라 에졍지 가다가 드로라
            <br />
            사ᄉᆞ미 지ᇝ대예 올아셔 ᄒᆡ금(奚琴)을 혀거를 드로라
            <br />
            얄리얄리 얄라셩 얄라리 얄라
            <br />
            <br />
            가다니 ᄇᆡ브른 도긔 설진 강수를 비조라
            <br />
            조롱곳 누로기 ᄆᆡ와 잡ᄉᆞ와니 내 엇디 ᄒᆞ리잇고
            <br />
            얄리얄리 얄라셩 얄라리 얄라
          </p>
        </div>
        <div className={styles.gap40}></div>
        <div className={styles.divider}></div>
        <div className={styles.gap40}></div>
        <div className={styles.map}>
          <h2 className={styles.sectionTitle}>상세 위치</h2>
          <div className={styles.mapContainer}>
            <div className={styles.mapImage}>지도입니다</div>
          </div>
        </div>
        <div className={styles.gap40}></div>
        <div className={styles.retrospect}>
          <div className={styles.retrospectContent}>
            <div className={styles.retrospectHeader}>
              <Image
                src="/icons/outline/chat.svg"
                alt="문의하기"
                width={24}
                height={24}
              />
              <span className={styles.retrospectTitle}>문의하기</span>
            </div>
            <div className={styles.inquiryForm}>
              <div className={styles.inputWrapper}>
                <textarea
                  className={styles.inquiryInput}
                  placeholder="문의사항을 입력해 주세요."
                  maxLength={100}
                />
                <div className={styles.inputCount}>0/100</div>
              </div>
              <button className={styles.inquiryButton}>문의 하기</button>
            </div>
          </div>
          <div className={styles.inquiryList}>
            <div className={styles.inquiryItem}>
              <div className={styles.inquiryItemHeader}>
                <div className={styles.inquiryProfile}>
                  <div className={styles.inquiryProfileImage}>
                    <Image
                      src="/images/h.png"
                      alt="프로필"
                      width={24}
                      height={24}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </div>
                  <span className={styles.inquiryProfileName}>홍길동</span>
                </div>
                <div className={styles.inquiryActions}>
                  <Image
                    src="/icons/outline/edit.svg"
                    alt="수정"
                    width={20}
                    height={20}
                  />
                  <Image
                    src="/icons/outline/close.svg"
                    alt="삭제"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <p className={styles.inquiryItemContent}>
                살겠노라 살겠노라. 청산에 살겠노라.
                <br />
                머루랑 다래를 먹고 청산에 살겠노라.
                <br />
                얄리얄리 얄랑셩 얄라리 얄라
              </p>
              <div className={styles.inquiryItemFooter}>
                <span className={styles.inquiryDate}>2024.11.11</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.gap40}></div>
      </div>
    </div>
  );
}
