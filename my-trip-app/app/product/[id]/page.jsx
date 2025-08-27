import ProductDetail from "../(detail)/index.jsx";

export default function ProductDetailPage({ params }) {
  return <ProductDetail id={params.id} />;
}   