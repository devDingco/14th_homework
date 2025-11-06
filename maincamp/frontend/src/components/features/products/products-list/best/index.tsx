"use client";

import { useState } from "react";
import styles from "./styles.module.css";

// Mock 데이터
const MOCK_ACCOMMODATIONS = [
  {
    id: 1,
    title: "포항 : 당장 가고 싶은 숙소",
    description:
      "살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라",
    price: "32,900",
    bookmarkCount: 24,
    imageUrl: "/images/accommodation_1.png",
  },
  {
    id: 2,
    title: "강릉 : 마음까지 깨끗해지는 하얀 숙소",
    description: "살어리 살어리랏다 강릉에 평생 살어리랏다",
    price: "32,900",
    bookmarkCount: 24,
    imageUrl: "/images/accommodation_2.png",
  },
  {
    id: 3,
    title: "제주 : 푸른 바다가 보이는 숙소",
    description: "제주 바다 앞에서 힐링하기 좋은 곳",
    price: "45,000",
    bookmarkCount: 32,
    imageUrl: "/images/accommodation_3.png",
  },
  {
    id: 4,
    title: "부산 : 해운대 근처 감성 숙소",
    description: "부산 여행의 시작과 끝을 함께하는 숙소",
    price: "38,500",
    bookmarkCount: 18,
    imageUrl: "/images/accommodation_4.png",
  },
];

export default function ProductsListBest() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < MOCK_ACCOMMODATIONS.length - 2) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>2024 끝여름 낭만있게 마무리 하고 싶다면?</h2>

      <div className={styles.cardArea}>
        <div
          className={styles.cardWrapper}
          style={{
            transform: `translateX(-${currentIndex * 40.75}rem)`,
          }}
        >
          {MOCK_ACCOMMODATIONS.map((accommodation) => (
            <div key={accommodation.id} className={styles.card}>
              <div
                className={styles.cardImage}
                style={{
                  backgroundImage: `url(${accommodation.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className={styles.imageGradient} />
              </div>

              <div className={styles.bookmark}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 17.4615L8.03075 19.1652C7.42825 19.4229 6.85583 19.3736 6.3135 19.0173C5.77117 18.6609 5.5 18.1597 5.5 17.5135V5.30775C5.5 4.80258 5.675 4.375 6.025 4.025C6.375 3.675 6.80258 3.5 7.30775 3.5H16.6923C17.1974 3.5 17.625 3.675 17.975 4.025C18.325 4.375 18.5 4.80258 18.5 5.30775V17.5135C18.5 18.1597 18.2288 18.6609 17.6865 19.0173C17.1442 19.3736 16.5718 19.4229 15.9693 19.1652L12 17.4615ZM12 15.8L16.5673 17.7673C16.6699 17.8121 16.7677 17.8025 16.8605 17.7385C16.9535 17.6743 17 17.5878 17 17.4788V5.30775C17 5.23075 16.9679 5.16025 16.9038 5.09625C16.8398 5.03208 16.7692 5 16.6923 5H7.30775C7.23075 5 7.16025 5.03208 7.09625 5.09625C7.03208 5.16025 7 5.23075 7 5.30775V17.4788C7 17.5878 7.0465 17.6743 7.1395 17.7385C7.23233 17.8025 7.33008 17.8121 7.43275 17.7673L12 15.8ZM12 5H7H17H12Z"
                    className={styles.bookmarkIcon}
                  />
                </svg>
                <span className={styles.bookmarkCount}>{accommodation.bookmarkCount}</span>
              </div>

              <div className={styles.contentArea}>
                <div className={styles.textArea}>
                  <h3 className={styles.cardTitle}>{accommodation.title}</h3>
                  <p className={styles.cardDescription}>{accommodation.description}</p>
                </div>
                <div className={styles.priceArea}>
                  <span className={styles.price}>{accommodation.price}</span>
                  <span className={styles.priceUnit}>원</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className={styles.nextButton} onClick={handleNext} aria-label="다음 숙소 보기">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_285_31935)">
            <rect x="25" y="25" width="40" height="40" rx="20" fill="white" />
            <path
              d="M48.461 45.0041L40.3141 36.8572C40.0993 36.6424 39.9946 36.3866 40.0002 36.0899C40.0058 35.7932 40.116 35.5373 40.3309 35.3223C40.5458 35.1074 40.8015 35 41.0982 35C41.3949 35 41.6508 35.1074 41.8658 35.3223L50.1457 43.6189C50.3411 43.8145 50.4859 44.0336 50.5802 44.2762C50.6747 44.5188 50.7219 44.7615 50.7219 45.0041C50.7219 45.2467 50.6747 45.4893 50.5802 45.7319C50.4859 45.9746 50.3411 46.1937 50.1457 46.3892L41.8491 54.6859C41.6342 54.9007 41.3812 55.0054 41.0901 54.9998C40.7988 54.9942 40.5458 54.884 40.3309 54.6691C40.116 54.4542 40.0086 54.1985 40.0086 53.9018C40.0086 53.6051 40.116 53.3492 40.3309 53.1342L48.461 45.0041Z"
              fill="#1C1C1C"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_285_31935"
              x="0"
              y="0"
              width="90"
              height="90"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_285_31935" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_285_31935" result="shape" />
            </filter>
          </defs>
        </svg>
      </button>
    </div>
  );
}
