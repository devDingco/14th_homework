import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui/card';

export function PointStatus() {
  const pointData = {
    totalPoints: 125000,
    earnedThisMonth: 35000,
    usedThisMonth: 15000,
  };

  return (
    <div>
      <h1 className="text-gray-900 mb-6">포인트현황</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">보유 포인트</span>
            <Wallet className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-900">{pointData.totalPoints.toLocaleString()}P</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">이번달 적립</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-green-600">+{pointData.earnedThisMonth.toLocaleString()}P</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">이번달 사용</span>
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-red-600">-{pointData.usedThisMonth.toLocaleString()}P</p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">최근 포인트 내역</h3>
        <div className="space-y-4">
          {[
            { date: '2025.11.03', description: '상품 판매', amount: 15000, type: 'earn' },
            { date: '2025.11.02', description: '상품 구매', amount: -8000, type: 'use' },
            { date: '2025.11.01', description: '포인트 충전', amount: 50000, type: 'earn' },
            { date: '2025.10.30', description: '상품 구매', amount: -3000, type: 'use' },
            { date: '2025.10.29', description: '상품 판매', amount: 12000, type: 'earn' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
            >
              <div>
                <p className="text-gray-900">{item.description}</p>
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
