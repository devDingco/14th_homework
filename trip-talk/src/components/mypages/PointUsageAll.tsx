"use client";

import { Card } from "../mypage_ui/card";
import { Badge } from "../mypage_ui/badge";
import { useTransactionStore } from "@/commons/stores/transaction-store";

export function PointUsageAll() {
  // Transaction 스토어에서 모든 거래 내역 가져오기
  const { transactions } = useTransactionStore();

  // 거래 내역을 표시용 데이터로 변환
  const allUsage = transactions.map((transaction) => {
    // 날짜 포맷팅
    const date = new Date(transaction.createdAt);
    const formattedDate = `${date.getFullYear()}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

    // 카테고리 결정
    let category = "충전";
    let description = "포인트 충전";

    if (transaction.status === "USED") {
      category = "구매";
      description = transaction.statusDetail || "상품 구매";
    }

    return {
      id: transaction._id,
      date: formattedDate,
      description,
      amount: transaction.amount,
      type: transaction.amount > 0 ? "earn" : "use",
      category,
    };
  });

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
          {allUsage.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              아직 포인트 사용 내역이 없습니다.
            </p>
          ) : (
            allUsage.map((item) => (
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
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
