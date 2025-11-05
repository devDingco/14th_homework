'use client';

import styles from './styles.module.css';
import Image from 'next/image';

interface BestAccommodation {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  bookmarkCount: number;
}

const mockData: BestAccommodation[] = [
  {
    id: '1',
    title: '포항 : 당장 가고 싶은 숙소',
    description:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    price: 32900,
    imageUrl: '/image1.jpg',
    bookmarkCount: 24,
  },
  {
    id: '2',
    title: '강릉 : 마음까지 깨끗해지는 하얀 숙소',
    description: '살어리 살어리랏다 강릉에 평생 살어리랏다',
    price: 32900,
    imageUrl: '/image1.jpg',
    bookmarkCount: 24,
  },
];

export default function AccommodationBest() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>2024 끝여름 낭만있게 마무리 하고 싶다면?</h2>
      <div className={styles.cardsContainer}>
        {mockData.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.imageContainer}>
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className={styles.image}
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.gradient} />
              <div className={styles.bookmark}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>{item.bookmarkCount}</span>
              </div>
              <div className={styles.content}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDescription}>{item.description}</p>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>{item.price.toLocaleString()}</span>
                  <span className={styles.priceUnit}>원</span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button className={styles.rightButton}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
