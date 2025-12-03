import ProductHeader from '@/components/accommodation-detail/product/header';
import ProductGallery from '@/components/accommodation-detail/product/gallery';
import Contents from '@/components/accommodation-detail/contents';
import Location from '@/components/accommodation-detail/location';
import Purchase from '@/components/accommodation-detail/purchase';
import Comments from '@/components/accommodation-detail/comments';
import AccommodationDetailLayout from '@/commons/components/accommodation-detail-layout';

// Mock 데이터
const mockComments = [
  {
    id: '1',
    content:
      '살겠노라 살겠노라. 청산에 살겠노라.\n머루랑 다래를 먹고 청산에 살겠노라.\n얄리얄리 얄랑셩 얄라리 얄라',
    author: 'user1',
    authorName: '홍길동',
    authorImage: '/profile.svg',
    createdAt: '2024.11.11',
  },
  {
    id: '2',
    content:
      '살겠노라 살겠노라. 청산에 살겠노라.\n머루랑 다래를 먹고 청산에 살겠노라.\n얄리얄리 얄랑셩 얄라리 얄라',
    author: 'user2',
    authorName: '자유로운 실버',
    authorImage: '/profile.svg',
    createdAt: '2024.11.11',
    reply: {
      id: 'reply1',
      content:
        '살겠노라 살겠노라. 청산에 살겠노라.\n머루랑 다래를 먹고 청산에 살겠노라.\n얄리얄리 얄랑셩 얄라리 얄라',
      author: 'seller1',
      authorName: '판매자',
      authorImage: '/profile.svg',
      createdAt: '2024.11.11',
      isSeller: true,
    },
  },
  {
    id: '3',
    content:
      '살겠노라 살겠노라. 청산에 살겠노라.\n머루랑 다래를 먹고 청산에 살겠노라.\n얄리얄리 얄랑셩 얄라리 얄라',
    author: 'user3',
    authorName: '둘리',
    createdAt: '2024.11.11',
  },
];

export default function AccommodationDetailPage() {
  // TODO: 실제 사용자 정보에서 판매자 여부 확인
  const isSeller = true; // 테스트를 위해 true로 설정

  return (
    <AccommodationDetailLayout
      header={<ProductHeader />}
      gallery={<ProductGallery />}
      purchase={<Purchase />}
      contents={<Contents />}
      location={<Location />}
      comments={<Comments travelproductId="" comments={mockComments} isSeller={isSeller} />}
    />
  );
}
