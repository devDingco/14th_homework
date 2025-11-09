"use client";

import { create } from "zustand";

// 트랜잭션 타입 정의
interface Transaction {
  _id: string;
  impUid: string;
  amount: number;
  balance: number;
  status: string;
  statusDetail: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

interface TransactionStore {
  currentBalance: number; // 현재 보유 포인트
  transactions: Transaction[]; // 충전 내역 목록
  latestTransaction: Transaction | null; // 가장 최근 트랜잭션

  // 최신 트랜잭션 설정 (결제 완료 시)
  setLatestTransaction: (transaction: Transaction) => void;

  // 트랜잭션 목록에 추가
  addTransaction: (transaction: Transaction) => void;

  // 현재 잔액 업데이트
  updateBalance: (balance: number) => void;

  // 포인트 사용 (차감)
  usePoints: (amount: number, description: string) => void;

  // 모든 데이터 초기화
  clearTransactions: () => void;
}

export const useTransactionStore = create<TransactionStore>((set) => {
  return {
    currentBalance: 0,
    transactions: [],
    latestTransaction: null,

    setLatestTransaction: (transaction: Transaction) => {
      set((state) => ({
        latestTransaction: transaction,
        currentBalance: transaction.balance,
        // 트랜잭션 목록 맨 앞에 추가 (최신순)
        transactions: [transaction, ...state.transactions],
      }));
    },

    addTransaction: (transaction: Transaction) => {
      set((state) => ({
        transactions: [transaction, ...state.transactions],
      }));
    },

    updateBalance: (balance: number) => {
      set({ currentBalance: balance });
    },

    // 포인트 사용 (차감)
    usePoints: (amount: number, description: string) => {
      set((state) => {
        const newBalance = state.currentBalance - amount;
        const usageTransaction: Transaction = {
          _id: `usage-${Date.now()}`,
          impUid: "",
          amount: -amount, // 음수로 저장 (사용)
          balance: newBalance,
          status: "USED",
          statusDetail: description,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        return {
          currentBalance: newBalance,
          transactions: [usageTransaction, ...state.transactions],
          latestTransaction: usageTransaction,
        };
      });
    },

    clearTransactions: () => {
      set({
        currentBalance: 0,
        transactions: [],
        latestTransaction: null,
      });
    },
  };
});
