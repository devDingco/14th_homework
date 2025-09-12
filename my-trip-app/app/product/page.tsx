import PlaceSliderSection from "@components/placeSliderSection/placeSliderSection";
import ProductList from "@components/productList/productList";
import SearchBarMenu from "@components/searchBarMenu/searchBar";
import ProductBanner from "@components/banner/productBanner";
import "../global.css";

// 메타데이터 최적화
export const metadata = {
  title: "숙박권 예약 - 여행 상품",
  description: "2025 끝여름 낭만있게 마무리할 수 있는 특별한 숙소를 찾아보세요",
};

export default function Product() {
  return (
    <>
      <PlaceSliderSection />
      <ProductBanner />
      <SearchBarMenu title="여기에서만 예약할 수 있는 숙소" filtersEnabled postButtonLabel="숙박권 판매하기" />
      <ProductList />
    </>
  );
}   