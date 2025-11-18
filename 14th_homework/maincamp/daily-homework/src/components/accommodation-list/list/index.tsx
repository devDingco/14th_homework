'use client';

import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import Image from 'next/image';
import styles from './styles.module.css';
import { Props, AccommodationCard } from './types';
import { FETCH_TRAVELPRODUCTS, DELETE_TRAVELPRODUCT, FETCH_USER_LOGGED_IN } from './queries';
import { FETCH_TRAVELPRODUCT } from '@/components/accommodation-detail/queries';
import {
  FetchTravelproductsQuery,
  FetchTravelproductsQueryVariables,
  FetchUserLoggedInQuery,
  FetchTravelproductQuery,
  FetchTravelproductQueryVariables,
} from '@/commons/graphql/graphql';
import { useMemo, useCallback, useState, useRef, useEffect } from 'react';

// DeleteTravelproduct mutation 타입 정의
type DeleteTravelproductMutationVariables = {
  travelproductId: string;
};

type DeleteTravelproductMutation = {
  deleteTravelproduct: string;
};

// 이미지 URL 처리 헬퍼 함수
const getImageUrl = (imageUrl: string | null | undefined): string => {
  if (!imageUrl) return '/image1.jpg';

  // 이미 완전한 URL인 경우 그대로 반환
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // 상대 경로인 경우 storage.googleapis.com 도메인 추가
  if (imageUrl.startsWith('/')) {
    return `https://storage.googleapis.com${imageUrl}`;
  }

  // 그 외의 경우 storage.googleapis.com 도메인 추가
  return `https://storage.googleapis.com/${imageUrl}`;
};

export default function AccommodationList({ accommodations }: Props) {
  const route = useRouter();
  const client = useApolloClient();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // 디바운싱을 위한 ref (각 카드별로 타이머 관리)
  const prefetchTimers = useRef<Map<string, NodeJS.Timeout>>(new Map());

  // 현재 로그인한 사용자 정보 가져오기
  const { data: userData } = useQuery<FetchUserLoggedInQuery>(FETCH_USER_LOGGED_IN);
  const currentUserId = userData?.fetchUserLoggedIn?._id;

  // GraphQL 쿼리로 상품 목록 데이터 가져오기
  const { data, loading, error, refetch } = useQuery<
    FetchTravelproductsQuery,
    FetchTravelproductsQueryVariables
  >(FETCH_TRAVELPRODUCTS, {
    variables: {
      page: 1,
      isSoldout: false,
    },
  });

  // 삭제 mutation
  const [deleteTravelproduct] = useMutation<
    DeleteTravelproductMutation,
    DeleteTravelproductMutationVariables
  >(DELETE_TRAVELPRODUCT, {
    onCompleted: () => {
      // 삭제 성공 후 목록 다시 불러오기
      refetch();
    },
    onError: (error) => {
      console.error('삭제 중 오류가 발생했습니다:', error);
      const errorMessage = error.message || '삭제 중 오류가 발생했습니다.';
      alert(errorMessage);
    },
  });

  // Travelproduct 데이터를 AccommodationCard 형식으로 변환
  const transformedAccommodations = useMemo((): AccommodationCard[] => {
    if (!data?.fetchTravelproducts) return accommodations || [];

    return data.fetchTravelproducts.map(
      (product): AccommodationCard => ({
        id: product._id,
        title: product.name,
        description: product.contents,
        price: product.price || 0,
        imageUrl:
          product.images && product.images.length > 0
            ? getImageUrl(product.images[0])
            : '/image1.jpg',
        bookmarkCount: product.pickedCount || 0,
        tags: product.tags || [],
        sellerName: product.seller?.name || '',
        sellerId: product.seller?._id,
        sellerImage: product.seller?.picture || undefined,
      })
    );
  }, [data, accommodations]);

  // 표시할 숙소 목록 메모이제이션
  const displayAccommodations = useMemo(() => {
    return transformedAccommodations.length > 0 ? transformedAccommodations : accommodations || [];
  }, [transformedAccommodations, accommodations]);

  // Prefetch 핸들러 (디바운싱 적용)
  const handlePrefetch = useCallback(
    (travelproductId: string) => {
      // 기존 타이머가 있으면 취소
      const existingTimer = prefetchTimers.current.get(travelproductId);
      if (existingTimer) {
        clearTimeout(existingTimer);
      }

      // 0.2초 후에 prefetch 실행
      const timer = setTimeout(() => {
        client
          .query<FetchTravelproductQuery, FetchTravelproductQueryVariables>({
            query: FETCH_TRAVELPRODUCT,
            variables: {
              travelproductId,
            },
            // fetchPolicy를 'cache-first'로 설정하여 캐시가 있으면 네트워크 요청 안 함
            fetchPolicy: 'cache-first',
          })
          .catch((error) => {
            // 에러는 조용히 처리 (prefetch이므로 사용자에게 노출하지 않음)
            console.debug('Prefetch 실패:', error);
          });

        // 실행 후 타이머 맵에서 제거
        prefetchTimers.current.delete(travelproductId);
      }, 200);

      // 새 타이머 저장
      prefetchTimers.current.set(travelproductId, timer);
    },
    [client]
  );

  // 마우스가 카드에서 벗어났을 때 타이머 취소
  const handleMouseLeave = useCallback((travelproductId: string) => {
    const timer = prefetchTimers.current.get(travelproductId);
    if (timer) {
      clearTimeout(timer);
      prefetchTimers.current.delete(travelproductId);
    }
    setHoveredCardId(null);
  }, []);

  // 컴포넌트 언마운트 시 모든 타이머 정리
  useEffect(() => {
    return () => {
      prefetchTimers.current.forEach((timer) => {
        clearTimeout(timer);
      });
      prefetchTimers.current.clear();
    };
  }, []);

  // 카드 클릭 핸들러 메모이제이션
  const handleCardClick = useCallback(
    (id: string) => {
      route.push(`accommodation-main/detail/${id}`);
    },
    [route]
  );

  // 삭제 핸들러
  const handleDelete = useCallback(
    async (e: React.MouseEvent, id: string) => {
      e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
      if (confirm('정말 이 상품을 삭제하시겠습니까?')) {
        try {
          await deleteTravelproduct({
            variables: {
              travelproductId: id,
            },
          });
        } catch (error) {
          console.error('삭제 실패:', error);
        }
      }
    },
    [deleteTravelproduct]
  );

  // 로딩 중이거나 에러가 있을 때 처리
  if (loading) {
    return (
      <div className={styles.layout}>
        <div className={styles.cardGrid}>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.layout}>
        <div className={styles.cardGrid}>데이터를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }
  return (
    <div className={styles.layout}>
      <div className={styles.cardGrid}>
        {displayAccommodations.map((accommodation: AccommodationCard) => (
          <div
            key={accommodation.id}
            className={styles.card}
            onClick={() => handleCardClick(accommodation.id)}
            onMouseEnter={() => {
              setHoveredCardId(accommodation.id);
              handlePrefetch(accommodation.id);
            }}
            onMouseLeave={() => handleMouseLeave(accommodation.id)}
          >
            <div className={styles.imageContainer}>
              <Image
                src={accommodation.imageUrl}
                alt={accommodation.title}
                fill
                className={styles.image}
                style={{ objectFit: 'cover' }}
              />
              {hoveredCardId === accommodation.id &&
                currentUserId &&
                accommodation.sellerId === currentUserId && (
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => handleDelete(e, accommodation.id)}
                    aria-label="삭제"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                    </svg>
                  </button>
                )}
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
