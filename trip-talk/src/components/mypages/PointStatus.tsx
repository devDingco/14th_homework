"use client";

import { useState } from "react";
import { Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { Card } from "../mypage_ui/card";
import { Button } from "../mypage_ui/button";
import PointChargeModal from "../point_payment/PointChargeModal";
import PaymentMethodModal from "../point_payment/PaymentMethodModal";
import { useTransactionStore } from "@/commons/stores/transaction-store";

export function PointStatus() {
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  // Transaction 스토어에서 데이터 가져오기
  const { currentBalance, transactions } = useTransactionStore();

  // 이번달 적립/사용 계산
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyStats = transactions.reduce(
    (acc, transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      if (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      ) {
        acc.earnedThisMonth += transaction.amount;
      }
      return acc;
    },
    { earnedThisMonth: 0, usedThisMonth: 0 }
  );

  const handleChargeConfirm = (amount: number) => {
    // 금액을 저장하고 충전 모달 닫기
    setSelectedAmount(amount);
    setIsChargeModalOpen(false);
    // 결제 수단 선택 모달 열기
    setIsPaymentModalOpen(true);
  };

  const handlePaymentComplete = (method: "kakaopay" | "nicepay") => {
    setIsPaymentModalOpen(false);
    alert(
      `${
        method === "kakaopay" ? "카카오페이" : "나이스페이"
      }로 ${selectedAmount.toLocaleString()}P가 충전되었습니다!`
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">포인트현황</h1>
        <Button
          onClick={() => setIsChargeModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          포인트 충전
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">보유 포인트</span>
            <Wallet className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-gray-900">{currentBalance.toLocaleString()}P</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">이번달 적립</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-green-600">
            +{monthlyStats.earnedThisMonth.toLocaleString()}P
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">이번달 사용</span>
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-red-600">
            -{monthlyStats.usedThisMonth.toLocaleString()}P
          </p>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">최근 포인트 내역</h3>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              아직 포인트 내역이 없습니다.
            </p>
          ) : (
            transactions.slice(0, 5).map((transaction) => {
              // 날짜 포맷팅
              const date = new Date(transaction.createdAt);
              const formattedDate = `${date.getFullYear()}.${String(
                date.getMonth() + 1
              ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;

              // 거래 유형 결정
              const isCharge = transaction.amount > 0;
              const description = isCharge
                ? "포인트 충전"
                : transaction.statusDetail || "상품 구매";

              return (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="text-gray-900">{description}</p>
                    <p className="text-gray-500">{formattedDate}</p>
                  </div>
                  <p className={isCharge ? "text-green-600" : "text-red-600"}>
                    {isCharge ? "+" : ""}
                    {transaction.amount.toLocaleString()}P
                  </p>
                </div>
              );
            })
          )}
        </div>
      </Card>

      {/* 포인트 충전 모달 */}
      <PointChargeModal
        isOpen={isChargeModalOpen}
        onClose={() => setIsChargeModalOpen(false)}
        onConfirm={handleChargeConfirm}
      />

      {/* 결제 수단 선택 모달 */}
      <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        amount={selectedAmount}
        onClose={() => setIsPaymentModalOpen(false)}
        onSelectPayment={handlePaymentComplete}
      />
    </div>
  );
}
