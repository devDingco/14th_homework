import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      product: '애플 아이폰 15 Pro',
      date: '2025.11.03',
      price: 1200000,
      status: '거래완료',
      type: 'sell',
    },
    {
      id: 2,
      product: '삼성 갤럭시 워치',
      date: '2025.11.02',
      price: 350000,
      status: '배송중',
      type: 'buy',
    },
    {
      id: 3,
      product: '노트북 LG 그램',
      date: '2025.10.28',
      price: 1500000,
      status: '거래완료',
      type: 'sell',
    },
    {
      id: 4,
      product: '에어팟 프로 2세대',
      date: '2025.10.25',
      price: 280000,
      status: '거래완료',
      type: 'buy',
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
      '거래완료': 'default',
      '배송중': 'secondary',
      '취소': 'destructive',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <div>
      <h1 className="text-gray-900 mb-6">거래내역</h1>

      <Card className="p-6">
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-gray-900">{transaction.product}</p>
                  <Badge variant="outline">
                    {transaction.type === 'sell' ? '판매' : '구매'}
                  </Badge>
                </div>
                <p className="text-gray-500">{transaction.date}</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-gray-900">{transaction.price.toLocaleString()}원</p>
                {getStatusBadge(transaction.status)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
