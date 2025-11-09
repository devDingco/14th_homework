import { Card } from '../mypage_ui/card';

export function PointPurchase() {
  const purchaseHistory = [
    {
      id: 1,
      date: '2025.11.02',
      product: '삼성 갤럭시 워치',
      amount: -8000,
    },
    {
      id: 2,
      date: '2025.10.30',
      product: '에어팟 프로 2세대',
      amount: -3000,
    },
    {
      id: 3,
      date: '2025.10.25',
      product: '다이슨 청소기 V15',
      amount: -4000,
    },
    {
      id: 4,
      date: '2025.10.18',
      product: '소니 WH-1000XM5',
      amount: -5000,
    },
    {
      id: 5,
      date: '2025.10.10',
      product: '아이패드 에어',
      amount: -6000,
    },
  ];

  return (
    <div>
      <h1 className="text-gray-900 mb-6">포인트사용내역 - 구매내역</h1>

      <Card className="p-6">
        <div className="space-y-4">
          {purchaseHistory.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1">
                <p className="text-gray-900 mb-2">상품 구매 - {item.product}</p>
                <p className="text-gray-500">{item.date}</p>
              </div>
              <p className="text-red-600">{item.amount.toLocaleString()}P</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
