import { Button } from "@commons/ui";
import Image from "next/image";
import styles from "./styles.module.css";

export default function ProductsDetailCard() {
  return (
    <div className={styles.card} data-testid="products-detail-card">
      <div className={styles.purchaseCard}>
        <div className={styles.priceSection}>
          <div className={styles.priceWrapper}>
            <span className={styles.price}>32,500</span>
            <span className={styles.currency}>원</span>
          </div>
          <div className={styles.description}>
            <p className={styles.descriptionText}>
              숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
            </p>
            <p className={styles.descriptionTextLight}>
              상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.
            </p>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button variant="FormBtn" type="submit">
            구매하기
          </Button>
        </div>
      </div>

      <div className={styles.sellerCard}>
        <h3 className={styles.sellerTitle}>판매자</h3>
        <div className={styles.sellerProfile}>
          <Image
            src="/images/profile/8.svg"
            alt="판매자 프로필"
            width={40}
            height={40}
            className={styles.profileImage}
          />
          <span className={styles.sellerName}>김상훈</span>
        </div>
      </div>
    </div>
  );
}

