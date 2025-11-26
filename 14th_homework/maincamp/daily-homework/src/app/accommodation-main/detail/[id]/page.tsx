'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import ProductHeader from '@/components/accommodation-detail/product/header';
import ProductGallery from '@/components/accommodation-detail/product/gallery';
import Contents from '@/components/accommodation-detail/contents';
import Location from '@/components/accommodation-detail/location';
import Purchase from '@/components/accommodation-detail/purchase';
import Comments from '@/components/accommodation-detail/comments';
import { FETCH_TRAVELPRODUCT } from '@/components/accommodation-detail/queries';
import {
  FetchTravelproductQuery,
  FetchTravelproductQueryVariables,
} from '@/commons/graphql/graphql';
import styles from '../styles.module.css';

export default function AccommodationDetailPage() {
  const params = useParams();
  const travelproductId = params?.id as string;

  // GraphQL 쿼리로 상품 상세 데이터 가져오기
  // fetchPolicy: 'cache-first' - 캐시에 데이터가 있으면 즉시 표시하고 네트워크 요청 안 함
  // 캐시에 없을 때만 네트워크 요청
  const { data, loading, error } = useQuery<
    FetchTravelproductQuery,
    FetchTravelproductQueryVariables
  >(FETCH_TRAVELPRODUCT, {
    variables: {
      travelproductId: travelproductId || '',
    },
    skip: !travelproductId,
    fetchPolicy: 'cache-first', // 캐시를 먼저 확인하고, 있으면 즉시 표시
  });

  const product = data?.fetchTravelproduct;

  // 로딩 중
  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <div>로딩 중...</div>
        </div>
      </div>
    );
  }

  // 에러 처리
  if (error || !product) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <div>상품 정보를 불러오는 중 오류가 발생했습니다.</div>
        </div>
      </div>
    );
  }

  // TODO: 실제 사용자 정보에서 판매자 여부 확인
  const isSeller = true; // 테스트를 위해 true로 설정

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        {/* 제품 헤더 */}
        <ProductHeader
          title={product.name}
          description={product.remarks}
          tags={product.tags || []}
          bookmarkCount={product.pickedCount || 0}
          productId={product._id}
          author={product.seller?.name}
        />

        {/* 이미지 갤러리와 Purchase를 같은 행에 배치 */}
        <div className={styles.topSection}>
          <div className={styles.productSection}>
            <ProductGallery images={product.images || []} title={product.name} />
          </div>
          <div className={styles.sidebar}>
            <Purchase
              price={product.price || 0}
              sellerName={product.seller?.name || ''}
              sellerImage={product.seller?.picture || '/profile.svg'}
            />
          </div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.divider} />
          <Contents description={product.contents} />
          <div className={styles.divider} />
          <Location
            address={product.travelproductAddress?.address || ''}
            addressDetail={product.travelproductAddress?.addressDetail || ''}
            lat={product.travelproductAddress?.lat ?? undefined}
            lng={product.travelproductAddress?.lng ?? undefined}
          />
          <Comments travelproductId={travelproductId} comments={[]} isSeller={isSeller} />
        </div>
      </div>
    </div>
  );
}
