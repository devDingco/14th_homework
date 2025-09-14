import { useState, useCallback } from "react";
import type { ProductData } from "../../_types/product";

export function useProductDetail(id: string) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 임시 데이터 - 실제로는 API에서 가져와야 함
  const galleryImages = [
    "/images/desktop/a.png",
    "/images/desktop/b.png",
    "/images/desktop/c.png",
    "/images/desktop/d.png",
  ];

  const productData: ProductData = {
    title: "포항 : 숙박권 명이 여기에 들어갑니다",
    subtitle: "예약 전 반드시 숙소 규정을 확인하세요",
    price: "32,500원",
    bookmarkCount: 24,
    description: "살어리 살어리랏다 청산에 살어리랏다. 멀위랑 다래랑 먹고 청산에 살어리랏다. 살어리 살어리랏다 강나래 우니렁 쉬여가며 살어리 살어리랏다.",
    additionalInfo: "아늑하고 편안한 휴식을 위한 프라이빗한 공간. 대형 통창으로 들어오는 햇살과 플랜테리어의 조화가 매력적인 숙소입니다. 인근 카페와 맛집, 바다가 가까워 도보로 충분히 즐길 수 있어요.",
    features: [
      "기본 2인 기준, 최대 6인까지 이용 가능",
      "침실 2, 거실 1, 욕실 1, 주방 1",
      "반려동물 동반 가능 (사전 문의 필수)",
      "건식 사우나, 야외 바비큐 시설"
    ],
    mapUrl: "https://www.google.com/maps?q=Seoul&output=embed",
    seller: {
      name: "홍길동",
      avatar: "/images/mobile/profile/img.png"
    }
  };

  const handleBookmark = useCallback(() => {
    // 북마크 로직 구현
    console.log("북마크 클릭");
  }, []);

  const handleDelete = useCallback(() => {
    // 삭제 로직 구현
    console.log("삭제 클릭");
  }, []);

  const handleLink = useCallback(() => {
    // 링크 공유 로직 구현
    console.log("링크 공유 클릭");
  }, []);

  const handleLocation = useCallback(() => {
    // 위치 보기 로직 구현
    console.log("위치 보기 클릭");
  }, []);

  return {
    galleryImages,
    selectedIndex,
    setSelectedIndex,
    productData,
    handleBookmark,
    handleDelete,
    handleLink,
    handleLocation
  };
}
