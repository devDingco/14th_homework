import ProductDetail from "../(detail)/index";

type PageProps = { params: { id: string } };

export default function ProductDetailPage({ params }: PageProps) {
  return <ProductDetail id={params.id} />;
}