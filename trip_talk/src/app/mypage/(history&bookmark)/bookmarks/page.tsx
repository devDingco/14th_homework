import { bookMarkData } from '@/commons/mypage/tables/mock';
import ProductTable from '@/commons/mypage/tables/product/ProductTable';

export default function MyPageBookmarksPage() {
  return (
    <div>
      <ProductTable data={bookMarkData} />
    </div>
  );
}
