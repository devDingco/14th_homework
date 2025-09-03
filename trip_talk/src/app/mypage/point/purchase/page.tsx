import { purchaseData } from '@/commons/mypage/tables/mock';
import PointTable, { PointData } from '@/commons/mypage/tables/point/PointTable';

export default function PurchaseHistoryPage() {
  const data = purchaseData as PointData[];
  return (
    <div>
      <PointTable data={data} tableType="purchase" />
    </div>
  );
}
