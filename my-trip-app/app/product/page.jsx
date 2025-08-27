import PlaceSliderSection from "@components/placeSliderSection/placeSliderSection.jsx";
import ProductList from "@components/productList/productList.css.jsx";
import SearchBarMenu from "@components/searchBarMenu/searchBar.jsx";
import ProductBanner from "@components/banner/productBanner";
import "../global.css";

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