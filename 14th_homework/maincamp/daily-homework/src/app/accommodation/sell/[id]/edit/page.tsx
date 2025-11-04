'use client';

import AccommodationSell from '@/components/accommodation-sell/page';
import { useParams } from 'next/navigation';

export default function AccommodationSellEditPage() {
  const params = useParams();
  // TODO: 실제 데이터 fetch 로직 추가
  const data = {
    id: params.id,
    // 예시 데이터
    name: '',
    summary: '',
    description: '',
    price: 0,
    tags: '',
    zipcode: '',
    address: '',
    addressDetail: '',
    lat: '',
    lng: '',
    imageUrl: '',
  };

  return <AccommodationSell isEdit={true} data={data} />;
}
