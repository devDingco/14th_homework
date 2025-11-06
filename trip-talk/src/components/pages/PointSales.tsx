import { Card } from '../mypage_ui/card';

export function PointSales() {
  const salesHistory = [
    {
      id: 1,
      date: '2025.11.03',
      product: '애플 아이폰 15 Pro',
      amount: 15000,
    },
    {
      id: 2,
      date: '2025.10.29',
      product: '노트북 LG 그램',
      amount: 12000,
    },
    {
      id: 3,
      date: '2025.10.22',
      product: '애플워치 시리즈 9',
      amount: 8000,
    },
    {
      id: 4,
      date: '2025.10.15',
      product: '갤럭시 버즈 프로',
      amount: 5000,
    },
    {
      id: 5,
      date: '2025.10.08',
      product: '아이패드 프로',
      amount: 18000,
    },
  ];

  return (
    <div>
      <h1 className="text-gray-900 mb-6">포인트사용내역 - 판매내역</h1>

      <Card className="p-6">
        <div className="space-y-4">
          {salesHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1">
                <p className="text-gray-900 mb-2">상품 판매 - {item.product}</p>
                <p className="text-gray-500">{item.date}</p>
              </div>
              <p className="text-green-600">+{item.amount.toLocaleString()}P</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
