import ProductDetail from "../../(components)/productDetail";
import InquirySection from "@components/comment/inquirySection";

type PageProps = { params: Promise<{ id: string }> };

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  return (
    <>
      <ProductDetail id={id} />
      <InquirySection />
    </>
  );
}