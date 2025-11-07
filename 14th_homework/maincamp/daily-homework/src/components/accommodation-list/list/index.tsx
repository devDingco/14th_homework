'use client';

import { useRouter } from 'next/navigation';
import styles from './styles.module.css';
import { Props } from './types';

// 임시 데이터 (나중에 API로 교체)
const mockData = [
  {
    id: '1',
    title:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    description:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    price: 32900,
    imageUrl: '/image1.jpg',
    bookmarkCount: 24,
    tags: ['#6인 이하', '#건식 사우나', '#애견동반 가능'],
    sellerName: '빈얀트리',
  },
  {
    id: '2',
    title:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    description:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    price: 32900,
    imageUrl: '/image1.jpg',
    bookmarkCount: 24,
    tags: ['#6인 이하', '#건식 사우나', '#애견동반 가능'],
    sellerName: '빈얀트리',
  },
  {
    id: '3',
    title:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    description:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    price: 32900,
    imageUrl: '/image1.jpg',
    bookmarkCount: 24,
    tags: ['#6인 이하', '#건식 사우나', '#애견동반 가능'],
    sellerName: '빈얀트리',
  },
  {
    id: '4',
    title:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    description:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    price: 32900,
    imageUrl: '/image1.jpg',
    bookmarkCount: 24,
    tags: ['#6인 이하', '#건식 사우나', '#애견동반 가능'],
    sellerName: '빈얀트리',
  },
  {
    id: '5',
    title:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    description:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    price: 32900,
    imageUrl: '/image1.jpg',
    bookmarkCount: 24,
    tags: ['#6인 이하', '#건식 사우나', '#애견동반 가능'],
    sellerName: '빈얀트리',
  },
  {
    id: '6',
    title:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    description:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    price: 32900,
    imageUrl: '/image1.jpg',
    bookmarkCount: 24,
    tags: ['#6인 이하', '#건식 사우나', '#애견동반 가능'],
    sellerName: '빈얀트리',
  },
  {
    id: '7',
    title:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    description:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    price: 32900,
    imageUrl: '/image1.jpg',
    bookmarkCount: 24,
    tags: ['#6인 이하', '#건식 사우나', '#애견동반 가능'],
    sellerName: '빈얀트리',
  },
  {
    id: '8',
    title:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    description:
      '살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라 얄리얄리 얄라셩 얄라리 얄라',
    price: 32900,
    imageUrl: '/image1.jpg',
    bookmarkCount: 24,
    tags: ['#6인 이하', '#건식 사우나', '#애견동반 가능'],
    sellerName: '빈얀트리',
  },
];

export default function AccommodationList({ accommodations = mockData }: Props) {
  const route = useRouter();
  return (
    <div className={styles.layout}>
      <div className={styles.cardGrid}>
        {accommodations.map((accommodation) => (
          <div
            key={accommodation.id}
            className={styles.card}
            onClick={() => route.push(`accommodation-main/detail`)}
          >
            <div className={styles.imageContainer}>
              <img
                src={accommodation.imageUrl}
                alt={accommodation.title}
                className={styles.image}
              />
              <div className={styles.bookmark}>
                <svg
                  className={styles.bookmarkIcon}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
                <span>{accommodation.bookmarkCount}</span>
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.title}>{accommodation.title}</h3>
              <p className={styles.description}>{accommodation.description}</p>
              <div className={styles.tags}>{accommodation.tags.join(' ')}</div>
              <div className={styles.footer}>
                <div className={styles.profile}>
                  <div className={styles.profileImage}></div>
                  <span className={styles.profileName}>{accommodation.sellerName}</span>
                </div>
                <div className={styles.price}>
                  <span className={styles.priceValue}>{accommodation.price.toLocaleString()}</span>
                  <span className={styles.priceUnit}>원</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
