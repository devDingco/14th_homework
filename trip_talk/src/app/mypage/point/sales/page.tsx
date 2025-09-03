import PointTable from '@/commons/mypage/tables/point/PointTable';
import { saleData } from '@/commons/mypage/tables/mock';
import { PointData } from '@/commons/mypage/tables/point/PointTable';
export default function SalesHistoryPage() {
  const data = saleData as PointData[];
  return (
    <div>
      <PointTable data={data} tableType="sales" />
    </div>
  );
}
