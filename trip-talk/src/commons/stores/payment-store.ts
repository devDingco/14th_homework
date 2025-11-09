"use client";

import { create } from "zustand";

interface PaymentStore {
  paymentId: string;
  paymentMethod: "kakaopay" | "nicepay" | null;
  paymentAmount: number;
  setPaymentId: (id: string) => void;
  setPaymentMethod: (method: "kakaopay" | "nicepay" | null) => void;
  setPaymentAmount: (amount: number) => void;
  setPaymentInfo: (
    id: string,
    method: "kakaopay" | "nicepay",
    amount: number
  ) => void;
  clearPayment: () => void;
}

export const usePaymentStore = create<PaymentStore>((set) => {
  return {
    paymentId: "",
    paymentMethod: null,
    paymentAmount: 0,

    setPaymentId: (id: string) => {
      set({ paymentId: id });
    },

    setPaymentMethod: (method: "kakaopay" | "nicepay" | null) => {
      set({ paymentMethod: method });
    },

    setPaymentAmount: (amount: number) => {
      set({ paymentAmount: amount });
    },

    // 결제 정보 한 번에 설정
    setPaymentInfo: (
      id: string,
      method: "kakaopay" | "nicepay",
      amount: number
    ) => {
      set({ paymentId: id, paymentMethod: method, paymentAmount: amount });
    },

    // 결제 정보 초기화
    clearPayment: () => {
      set({ paymentId: "", paymentMethod: null, paymentAmount: 0 });
    },
  };
});
