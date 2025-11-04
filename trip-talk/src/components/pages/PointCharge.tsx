import { Card } from '../ui/card';

export function PointCharge() {
  const chargeHistory = [
    {
      id: 1,
      date: '2025.11.01',
      amount: 50000,
      method: '신용카드',
      status: '완료',
    },
    {
      id: 2,
      date: '2025.10.28',
      amount: 30000,
      method: '계좌이체',
      status: '완료',
    },
    {
      id: 3,
      date: '2025.10.20',
      amount: 100000,
      method: '신용카드',
      status: '완료',
    },
    {
      id: 4,
      date: '2025.10.15',
      amount: 20000,
      method: '카카오페이',
      status: '완료',
    },
    {
      id: 5,
      date: '2025.10.10',
      amount: 50000,
      method: '신용카드',
      status: '완료',
    },
  ];

  return (
    <div>
      <h1 className="text-gray-900 mb-6">포인트사용내역 - 충전내역</h1>

      <Card className="p-6">
        <div className="space-y-4">
          {chargeHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1">
                <p className="text-gray-900 mb-2">포인트 충전 ({item.method})</p>
                <p className="text-gray-500">{item.date}</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-green-600">+{item.amount.toLocaleString()}P</p>
                <span className="text-gray-600 w-12">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
