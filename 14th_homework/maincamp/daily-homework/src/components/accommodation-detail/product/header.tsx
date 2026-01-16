'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import {
  TOGGLE_TRAVELPRODUCT_PICK,
  FETCH_TRAVELPRODUCT,
} from '@/components/accommodation-detail/queries';
import { MutationToggleTravelproductPickArgs } from '@/commons/graphql/graphql';
import styles from './header.module.css';

interface ProductHeaderProps {
  title?: string;
  description?: string;
  tags?: string[];
  bookmarkCount?: number;
  productId?: string;
  author?: string;
}

export default function ProductHeader({
  title = '포항 : 숙박권 명이 여기에 들어갑니다',
  description = '모던한 분위기의 감도높은 숙소',
  tags = ['#6인 이하', '#건식 사우나', '#애견동반 가능'],
  bookmarkCount = 24,
  productId,
  author,
}: ProductHeaderProps) {
  const router = useRouter();
  const [currentBookmarkCount, setCurrentBookmarkCount] = useState(bookmarkCount);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // props로 전달된 bookmarkCount가 변경되면 동기화
  useEffect(() => {
    setCurrentBookmarkCount(bookmarkCount);
  }, [bookmarkCount]);

  const [toggleTravelproductPick, { loading: toggleLoading }] = useMutation<
    any,
    MutationToggleTravelproductPickArgs
  >(TOGGLE_TRAVELPRODUCT_PICK, {
    refetchQueries: productId
      ? [
          {
            query: FETCH_TRAVELPRODUCT,
            variables: {
              travelproductId: productId,
            },
          },
        ]
      : [],
    awaitRefetchQueries: true,
  });

  const handleEditClick = () => {
    if (productId) {
      router.push(`/accommodation/sell/${productId}/edit`);
    }
  };

  const handleBookmarkClick = async () => {
    if (!productId || toggleLoading) return;

    try {
      // 낙관적 업데이트
      const newBookmarkedState = !isBookmarked;
      setIsBookmarked(newBookmarkedState);
      setCurrentBookmarkCount((prev) => (newBookmarkedState ? prev + 1 : prev - 1));

      await toggleTravelproductPick({
        variables: {
          travelproductId: productId,
        },
      });
      // refetchQueries로 자동 업데이트되므로 별도 처리 불필요
    } catch (error) {
      console.error('북마크 토글 실패:', error);
      // 실패 시 롤백
      setIsBookmarked(!isBookmarked);
      setCurrentBookmarkCount((prev) => (isBookmarked ? prev + 1 : prev - 1));
      alert('북마크 처리에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.iconGroup}>
          {productId && (
            <button className={styles.iconButton} aria-label="수정" onClick={handleEditClick}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 19H6.2615L16.498 8.7635L15.2365 7.502L5 17.7385V19ZM4.404 20.5C4.14783 20.5 3.93317 20.4133 3.76 20.24C3.58667 20.0668 3.5 19.8522 3.5 19.596V17.8635C3.5 17.6197 3.54683 17.3873 3.6405 17.1663C3.734 16.9453 3.86283 16.7527 4.027 16.5885L16.6905 3.93075C16.8417 3.79342 17.0086 3.68733 17.1913 3.6125C17.3741 3.5375 17.5658 3.5 17.7663 3.5C17.9668 3.5 18.1609 3.53558 18.3488 3.60675C18.5368 3.67792 18.7032 3.79108 18.848 3.94625L20.0693 5.18275C20.2244 5.32758 20.335 5.49425 20.401 5.68275C20.467 5.87125 20.5 6.05975 20.5 6.24825C20.5 6.44942 20.4657 6.64133 20.397 6.824C20.3283 7.00683 20.2191 7.17383 20.0693 7.325L7.4115 19.973C7.24733 20.1372 7.05475 20.266 6.83375 20.3595C6.61275 20.4532 6.38033 20.5 6.1365 20.5H4.404ZM15.8562 8.14375L15.2365 7.502L16.498 8.7635L15.8562 8.14375Z"
                  fill="#333333"
                />
              </svg>
            </button>
          )}
          <button className={styles.iconButton} aria-label="삭제">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
          </button>
          <button className={styles.iconButton} aria-label="링크 공유">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
          </button>
          <button className={styles.iconButton} aria-label="위치">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </button>
          <button
            className={styles.bookmarkButton}
            onClick={handleBookmarkClick}
            disabled={toggleLoading || !productId}
            style={{
              background: isBookmarked ? 'rgba(41, 116, 229, 0.8)' : 'rgba(0, 0, 0, 0.4)',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={isBookmarked ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <span>{currentBookmarkCount}</span>
          </button>
        </div>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{description}</p>
        {author && <span className={styles.author}>글쓴이: {author}</span>}
      </div>
      <div className={styles.tags}>{tags.join(' ')}</div>
    </div>
  );
}
