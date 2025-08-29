import { productData } from '@/commons/mypage/tables/mock';
import ProductTable from '@/commons/mypage/tables/product/ProductTable';

export default function MyPageProductsPage() {
  return (
    <div>
      <ProductTable data={productData} />
    </div>
  );
}
