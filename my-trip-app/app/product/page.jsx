import PlaceSliderSection from "@components/placeSliderSection";
import ProductList from "@components/productList";
import HeadComponent from "@components/boardList/headCompoents/headComponent";
import "../global.css";
export default function Product() {
  return (
      <>
        <PlaceSliderSection />
        <HeadComponent />
        <ProductList />
      </>
  );
}   