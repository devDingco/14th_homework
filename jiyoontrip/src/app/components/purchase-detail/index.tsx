"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import styles from "./styles.module.css";
import usePurchaseModal from "./hooks/index.link.modal.hook";
import usePurchaseDetailBinding from "./hooks/index.binding.hook";
import { ROUTES } from "@/app/commons/constants/url";

export default function PurchaseDetail() {
  const params = useParams();
  const router = useRouter();
  const { openPurchaseConfirmModal } = usePurchaseModal();
  const { travelproduct, isLoading, formatPrice, formatTags } = usePurchaseDetailBinding();

  const handleEditClick = () => {
    const id = params?.id as string;
    if (id) {
      router.push(ROUTES.PURCHASE.EDIT(id));
    }
  };

  if (isLoading) {
    return (
      <div className={styles.page} data-testid="purchase-detail-page">
        <div className={styles.container}>
          <div>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!travelproduct) {
    return (
      <div className={styles.page} data-testid="purchase-detail-page">
        <div className={styles.container}>
          <div>상품 정보를 불러올 수 없습니다.</div>
        </div>
      </div>
    );
  }

  const getImageUrl = (imagePath?: string | null): string => {
    if (!imagePath) return "/images/Rectangle 3011.png";
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
      return imagePath;
    }
    return `https://storage.googleapis.com/${imagePath}`;
  };

  const mainImage = getImageUrl(travelproduct.images?.[0]);
  const thumbnails = travelproduct.images?.slice(1).map(getImageUrl) || [];
  const tagsText = formatTags(travelproduct.tags);

  return (
    <div className={styles.page} data-testid="purchase-detail-page">
      <div className={styles.container}>
        <div className={styles.title}>
          <div className={styles.titleTop}>
            <h1 className={styles.titleText} data-testid="detail-title">
              {travelproduct.name}
            </h1>
            <div className={styles.titleIcons}>
              <Image
                src="/icons/outline/edit.svg"
                alt="수정"
                width={24}
                height={24}
                onClick={handleEditClick}
                style={{ cursor: "pointer" }}
              />
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
                <span className={styles.bookmarkCount} data-testid="detail-bookmark-count">
                  {travelproduct.pickedCount || 0}
                </span>
              </div>
            </div>
          </div>
          <p className={styles.subtitle} data-testid="detail-subtitle">
            {travelproduct.remarks}
          </p>
          {tagsText && (
            <p className={styles.hashtags} data-testid="detail-hashtags">
              {tagsText}
            </p>
          )}
        </div>
        <div className={styles.gap24}></div>
        <div className={styles.purchaseArea}>
          <div className={styles.mainImage}>
            <img
              src={mainImage}
              alt="숙소 메인 이미지"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              data-testid="detail-main-image"
            />
          </div>
          <div className={styles.thumbnailList}>
            <div className={styles.thumbnailWrapper}>
              {thumbnails.map((thumbnail, index) => (
                <div key={index} className={styles.thumbnail}>
                  <img
                    src={thumbnail}
                    alt={`숙소 이미지 ${index + 1}`}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    data-testid="detail-thumbnail"
                  />
                </div>
              ))}
            </div>
            <div className={styles.gradient}></div>
          </div>
          <div className={styles.purchaseBox}>
            <div className={styles.purchaseCard}>
              <div className={styles.priceInfo}>
                <div className={styles.priceRow}>
                  <p className={styles.priceAmount} data-testid="detail-price">
                    {formatPrice(travelproduct.price)}
                  </p>
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
                  <img
                    src={travelproduct.seller?.picture 
                      ? getImageUrl(travelproduct.seller.picture)
                      : "/images/f.png"}
                    alt="판매자 프로필"
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <p className={styles.sellerName} data-testid="detail-seller-name">
                  {travelproduct.seller?.name || "판매자"}
                </p>
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
          <p className={styles.description} data-testid="detail-contents">
            {travelproduct.contents}
          </p>
        </div>
        <div className={styles.gap40}></div>
        <div className={styles.divider}></div>
        <div className={styles.gap40}></div>
        <div className={styles.map} data-testid="detail-map-area">
          <h2 className={styles.sectionTitle}>상세 위치</h2>
          <div className={styles.mapContainer}>
            <div className={styles.mapImage}>
              {travelproduct.travelproductAddress?.address
                ? travelproduct.travelproductAddress.address
                : "지도입니다"}
            </div>
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
