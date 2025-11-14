'use client';

import AccommodationSell from '@/components/accommodation-sell/page';
import { useParams } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { FETCH_TRAVELPRODUCT } from '@/components/accommodation-detail/queries';
import {
  FetchTravelproductQuery,
  FetchTravelproductQueryVariables,
} from '@/commons/graphql/graphql';

export default function AccommodationSellEditPage() {
  const params = useParams();
  const travelproductId = params?.id as string;

  // GraphQL 쿼리로 상품 상세 데이터 가져오기
  const {
    data: queryData,
    loading,
    error,
  } = useQuery<FetchTravelproductQuery, FetchTravelproductQueryVariables>(FETCH_TRAVELPRODUCT, {
    variables: {
      travelproductId: travelproductId || '',
    },
    skip: !travelproductId,
  });

  const product = queryData?.fetchTravelproduct;

  // 로딩 중
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>로딩 중...</div>
      </div>
    );
  }

  // 에러 처리
  if (error || !product) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div>상품 정보를 불러오는 중 오류가 발생했습니다.</div>
      </div>
    );
  }

  // GraphQL 데이터를 AccommodationSell 컴포넌트가 기대하는 형식으로 변환
  const data = {
    id: product._id,
    name: product.name || '',
    summary: product.remarks || '', // remarks -> summary
    description: product.contents || '', // contents -> description
    price: product.price || 0,
    tags: product.tags?.join(', ') || '', // 배열을 쉼표로 구분된 문자열로 변환
    zipcode: product.travelproductAddress?.zipcode || '',
    address: product.travelproductAddress?.address || '',
    addressDetail: product.travelproductAddress?.addressDetail || '',
    lat: product.travelproductAddress?.lat?.toString() || '',
    lng: product.travelproductAddress?.lng?.toString() || '',
    imageUrl: product.images?.[0] || '', // 첫 번째 이미지 사용
  };

  return <AccommodationSell isEdit={true} data={data} />;
}
