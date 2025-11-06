import { Card } from '../mypage_ui/card';
import { Badge } from '../mypage_ui/badge';

export function PointUsageAll() {
  const allUsage = [
    {
      id: 1,
      date: '2025.11.03',
      description: '상품 판매 - 애플 아이폰 15 Pro',
      amount: 15000,
      type: 'earn',
      category: '판매',
    },
    {
      id: 2,
      date: '2025.11.02',
      description: '상품 구매 - 삼성 갤럭시 워치',
      amount: -8000,
      type: 'use',
      category: '구매',
    },
    {
      id: 3,
      date: '2025.11.01',
      description: '포인트 충전',
      amount: 50000,
      type: 'earn',
      category: '충전',
    },
    {
      id: 4,
      date: '2025.10.30',
      description: '상품 구매 - 에어팟 프로',
      amount: -3000,
      type: 'use',
      category: '구매',
    },
    {
      id: 5,
      date: '2025.10.29',
      description: '상품 판매 - 노트북 LG 그램',
      amount: 12000,
      type: 'earn',
      category: '판매',
    },
    {
      id: 6,
      date: '2025.10.28',
      description: '포인트 충전',
      amount: 30000,
      type: 'earn',
      category: '충전',
    },
    {
      id: 7,
      date: '2025.10.25',
      description: '상품 구매 - 다이슨 청소기',
      amount: -4000,
      type: 'use',
      category: '구매',
    },
  ];

  const getCategoryBadge = (category: string) => {
    const colors: { [key: string]: 'default' | 'secondary' | 'outline' } = {
      충전: 'default',
      구매: 'secondary',
      판매: 'outline',
    };
    return <Badge variant={colors[category] || 'outline'}>{category}</Badge>;
  };

  return (
    <div>
      <h1 className="text-gray-900 mb-6">포인트사용내역 - 전체</h1>

      <Card className="p-6">
        <div className="space-y-4">
          {allUsage.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-gray-900">{item.description}</p>
                  {getCategoryBadge(item.category)}
                </div>
                <p className="text-gray-500">{item.date}</p>
              </div>
              <p
                className={
                  item.type === 'earn' ? 'text-green-600' : 'text-red-600'
                }
              >
                {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString()}P
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
