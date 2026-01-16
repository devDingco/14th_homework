'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import ProductHeader from '@/components/accommodation-detail/product/header';
import ProductGallery from '@/components/accommodation-detail/product/gallery';
import Contents from '@/components/accommodation-detail/contents';
import Location from '@/components/accommodation-detail/location';
import Purchase from '@/components/accommodation-detail/purchase';
import Comments from '@/components/accommodation-detail/comments';
import AccommodationDetailLayout from '@/commons/components/accommodation-detail-layout';
import LoadingState from '@/commons/components/loading-state';
import ErrorState from '@/commons/components/error-state';
import { FETCH_TRAVELPRODUCT } from '@/components/accommodation-detail/queries';
import {
  FetchTravelproductQuery,
  FetchTravelproductQueryVariables,
} from '@/commons/graphql/graphql';

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
      <AccommodationDetailLayout
        header={null}
        gallery={null}
        purchase={null}
        contents={<LoadingState />}
        location={null}
        comments={null}
      />
    );
  }

  // 에러 처리
  if (error || !product) {
    return (
      <AccommodationDetailLayout
        header={null}
        gallery={null}
        purchase={null}
        contents={<ErrorState message="상품 정보를 불러오는 중 오류가 발생했습니다." />}
        location={null}
        comments={null}
      />
    );
  }

  // TODO: 실제 사용자 정보에서 판매자 여부 확인
  const isSeller = true; // 테스트를 위해 true로 설정

  return (
    <AccommodationDetailLayout
      header={
        <ProductHeader
          title={product.name}
          description={product.remarks}
          tags={product.tags || []}
          bookmarkCount={product.pickedCount || 0}
          productId={product._id}
          author={product.seller?.name}
        />
      }
      gallery={<ProductGallery images={product.images || []} title={product.name} />}
      purchase={
        <Purchase
          price={product.price || 0}
          sellerName={product.seller?.name || ''}
          sellerImage={product.seller?.picture || '/profile.svg'}
        />
      }
      contents={<Contents description={product.contents} />}
      location={
        <Location
          address={product.travelproductAddress?.address || ''}
          addressDetail={product.travelproductAddress?.addressDetail || ''}
          lat={product.travelproductAddress?.lat ?? undefined}
          lng={product.travelproductAddress?.lng ?? undefined}
        />
      }
      comments={<Comments travelproductId={travelproductId} comments={[]} isSeller={isSeller} />}
    />
  );
}
