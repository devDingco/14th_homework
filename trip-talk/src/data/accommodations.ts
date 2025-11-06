export interface Accommodation {
  id: string;
  name: string;
  category: string;
  location: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  amenities: string[];
  checkIn: string;
  checkOut: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  seller: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  availableDates: string[];
  tags: string[];
}

export const accommodations: Accommodation[] = [
  {
    id: '1',
    name: '럭셔리 오션뷰 호텔',
    category: '호텔',
    location: '부산 해운대구',
    price: 180000,
    originalPrice: 250000,
    discount: 28,
    rating: 4.8,
    reviewCount: 324,
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYyMjUyOTg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '해운대 해변이 한눈에 보이는 프리미엄 오션뷰 객실입니다. 최고급 시설과 서비스를 제공하며, 조식 뷔페가 포함되어 있습니다.',
    amenities: ['무료 Wi-Fi', '조식 포함', '수영장', '피트니스', '발레파킹', '스파'],
    checkIn: '15:00',
    checkOut: '11:00',
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    seller: {
      name: '해운대 그랜드 호텔',
      avatar: 'https://ui-avatars.com/api/?name=Hotel&background=0D8ABC&color=fff',
      verified: true,
    },
    availableDates: ['2025-11-10', '2025-11-11', '2025-11-15', '2025-11-20'],
    tags: ['인기', '오션뷰', '조식포함'],
  },
  {
    id: '2',
    name: '제주 풀빌라 리조트',
    category: '펜션',
    location: '제주 서귀포시',
    price: 320000,
    originalPrice: 420000,
    discount: 24,
    rating: 4.9,
    reviewCount: 189,
    imageUrl: 'https://images.unsplash.com/photo-1759805583363-87fdee48b581?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBwb29sJTIwdmlld3xlbnwxfHx8fDE3NjIzMzE3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '프라이빗 풀이 있는 독채 펜션입니다. 제주의 아름다운 자연 속에서 힐링하실 수 있습니다.',
    amenities: ['전용 수영장', '바비큐', '주차장', '넷플릭스', '욕조', '오션뷰'],
    checkIn: '15:00',
    checkOut: '11:00',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 2,
    seller: {
      name: '제주힐링펜션',
      avatar: 'https://ui-avatars.com/api/?name=Jeju&background=10B981&color=fff',
      verified: true,
    },
    availableDates: ['2025-11-12', '2025-11-13', '2025-11-18', '2025-11-25'],
    tags: ['프라이빗', '풀빌라', '독채'],
  },
  {
    id: '3',
    name: '강남 모던 아파트먼트',
    category: '아파트',
    location: '서울 강남구',
    price: 95000,
    rating: 4.6,
    reviewCount: 456,
    imageUrl: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjIyODIzNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '강남역 도보 5분 거리의 깨끗하고 모던한 아파트입니다. 비즈니스 여행객에게 최적화되어 있습니다.',
    amenities: ['무료 Wi-Fi', '에어컨', '세탁기', '주방', '업무공간', '주차가능'],
    checkIn: '14:00',
    checkOut: '11:00',
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
    seller: {
      name: 'Seoul Stay',
      avatar: 'https://ui-avatars.com/api/?name=Seoul&background=6366F1&color=fff',
      verified: true,
    },
    availableDates: ['2025-11-08', '2025-11-09', '2025-11-14', '2025-11-22'],
    tags: ['역세권', '비즈니스'],
  },
  {
    id: '4',
    name: '가평 숲속 통나무집',
    category: '펜션',
    location: '경기 가평군',
    price: 140000,
    originalPrice: 180000,
    discount: 22,
    rating: 4.7,
    reviewCount: 267,
    imageUrl: 'https://images.unsplash.com/photo-1660321398531-489358ea488f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FiaW4lMjBiZWRyb29tfGVufDF8fHx8MTc2MjI2OTc5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '울창한 숲속의 아늑한 통나무집입니다. 가족 단위 여행객에게 추천합니다.',
    amenities: ['바비큐', '주차장', '난방', '벽난로', '와이파이', '반려동물 동반'],
    checkIn: '15:00',
    checkOut: '11:00',
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
    seller: {
      name: '가평 힐링스테이',
      avatar: 'https://ui-avatars.com/api/?name=Gapyeong&background=F59E0B&color=fff',
      verified: false,
    },
    availableDates: ['2025-11-16', '2025-11-17', '2025-11-23', '2025-11-24'],
    tags: ['펫프렌들리', '가족여행', '자연'],
  },
  {
    id: '5',
    name: '속초 해변 리조트',
    category: '리조트',
    location: '강원 속초시',
    price: 210000,
    originalPrice: 280000,
    discount: 25,
    rating: 4.8,
    reviewCount: 512,
    imageUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydHxlbnwxfHx8fDE3NjIyNjA1OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '속초 해변이 바로 앞에 있는 프리미엄 리조트입니다. 다양한 부대시설을 이용할 수 있습니다.',
    amenities: ['조식 포함', '수영장', '사우나', '키즈클럽', '레스토랑', '무료주차'],
    checkIn: '15:00',
    checkOut: '11:00',
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
    seller: {
      name: '속초비치리조트',
      avatar: 'https://ui-avatars.com/api/?name=Sokcho&background=EC4899&color=fff',
      verified: true,
    },
    availableDates: ['2025-11-19', '2025-11-20', '2025-11-26', '2025-11-27'],
    tags: ['해변', '키즈', '조식포함'],
  },
  {
    id: '6',
    name: '평창 마운틴 호텔',
    category: '호텔',
    location: '강원 평창군',
    price: 165000,
    rating: 4.5,
    reviewCount: 198,
    imageUrl: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGhvdGVsfGVufDF8fHx8MTc2MjMzMTc2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: '산 속의 조용한 호텔입니다. 스키장과 가까워 겨울 스포츠를 즐기기에 완벽합니다.',
    amenities: ['스키장 근처', '온천', '레스토랑', '주차장', '와이파이', '난방'],
    checkIn: '15:00',
    checkOut: '11:00',
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
    seller: {
      name: '평창 알펜시아',
      avatar: 'https://ui-avatars.com/api/?name=Pyeongchang&background=8B5CF6&color=fff',
      verified: true,
    },
    availableDates: ['2025-11-21', '2025-11-28', '2025-11-29', '2025-11-30'],
    tags: ['스키', '온천', '산악'],
  },
];
