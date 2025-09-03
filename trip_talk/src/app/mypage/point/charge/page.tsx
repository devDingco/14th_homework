import PointTable, { PointData } from '@/commons/mypage/tables/point/PointTable';
import { chargeData } from '@/commons/mypage/tables/mock';

export default function ChargeHistoryPage() {
  const pointData = chargeData as PointData[];
  return (
    <div>
      <PointTable data={pointData} tableType="charge" />
    </div>
  );
}
