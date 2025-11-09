"use client";

import { Card } from "../mypage_ui/card";
import { useTransactionStore } from "@/commons/stores/transaction-store";

export function PointCharge() {
  // Transaction 스토어에서 충전 내역 가져오기
  const { transactions } = useTransactionStore();

  return (
    <div>
      <h1 className="text-gray-900 mb-6">포인트사용내역 - 충전내역</h1>

      <Card className="p-6">
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              아직 충전 내역이 없습니다.
            </p>
          ) : (
            transactions.map((transaction) => {
              // 날짜 포맷팅
              const date = new Date(transaction.createdAt);
              const formattedDate = `${date.getFullYear()}.${String(
                date.getMonth() + 1
              ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

              return (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="flex-1">
                    <p className="text-gray-900 mb-2">포인트 충전 (카드결제)</p>
                    <p className="text-gray-500">{formattedDate}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-green-600">
                      +{transaction.amount.toLocaleString()}P
                    </p>
                    <span className="text-gray-600 w-12">
                      {transaction.status === "PAYMENT" ? "완료" : transaction.status}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}
