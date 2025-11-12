"use client";

import { useState } from "react";
import { useModalStore } from "@/app/commons/stores/store";
import Modal from "@/app/commons/components/modal";
import PortOne from "@portone/browser-sdk/v2";

export default function usePurchaseModal() {
  const { openModal, closeModal } = useModalStore();
  const [selectedAmount, setSelectedAmount] = useState<string>("");

  const openPurchaseConfirmModal = () => {
    openModal(
      <div data-testid="modal-purchase-confirm">
        <Modal
          actions="dual"
          title="해당 숙박권을 구매 하시겠어요?"
          description="해당 숙박권은 포인트로만 구매 가능합니다."
          confirmText="구매"
          cancelText="취소"
          onCancel={closeModal}
          onConfirm={() => {
            closeModal();
            openInsufficientPointModal();
          }}
        />
      </div>,
    );
  };

  const openInsufficientPointModal = () => {
    openModal(
      <div data-testid="modal-insufficient-point">
        <Modal
          actions="dual"
          title="포인트 부족"
          description={`포인트가 부족합니다.\n포인트 충전 후 구매하세요.`}
          confirmText="충전"
          cancelText="취소"
          onCancel={closeModal}
          onConfirm={() => {
            closeModal();
            openChargeModal();
          }}
        />
      </div>,
    );
  };

  const handlePortOnePayment = async (amount: string) => {
    try {
      const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
      const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

      if (!storeId || !channelKey) {
        console.error("포트원 환경 변수가 설정되지 않았습니다.");
        return;
      }

      const paymentId = `payment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const response = await PortOne.requestPayment({
        storeId,
        channelKey,
        paymentId,
        orderName: `포인트 충전 ${parseInt(amount).toLocaleString()}원`,
        totalAmount: parseInt(amount),
        currency: "KRW",
        payMethod: "EASY_PAY",
      });

      if (!response) {
        console.error("결제 응답이 없습니다.");
        return;
      }

      if (response.code !== undefined) {
        console.error("결제 실패:", response.message);
        return;
      }

      console.log("결제 성공:", response);
      closeModal();
    } catch (error) {
      console.error("결제 처리 중 오류:", error);
    }
  };

  const openChargeModal = () => {
    const chargeOptions = [
      { value: "10000", label: "10,000원" },
      { value: "30000", label: "30,000원" },
      { value: "50000", label: "50,000원" },
      { value: "100000", label: "100,000원" },
    ];

    openModal(
      <div data-testid="modal-charge">
        <Modal
          actions="cash"
          title="충전하실 금액을 선택해 주세요"
          confirmText="충전하기"
          cancelText="취소"
          dropdownOptions={chargeOptions}
          onCancel={closeModal}
          onConfirm={() => {
            if (selectedAmount) {
              handlePortOnePayment(selectedAmount);
            } else {
              closeModal();
            }
          }}
          onDropdownChange={(value) => {
            setSelectedAmount(value);
          }}
        />
      </div>,
    );
  };

  return {
    openPurchaseConfirmModal,
    openInsufficientPointModal,
    openChargeModal,
    closeModal,
  };
}
