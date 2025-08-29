import ProductDetail from "../(detail)/index"
import InquirySection from "@components/comment/inquirySection";

type PageProps = { params: { id: string } };

export default function ProductDetailPage({ params }: PageProps) {
  return (
    <>
      <ProductDetail id={params.id} />
      <InquirySection />
    </>
  );
}