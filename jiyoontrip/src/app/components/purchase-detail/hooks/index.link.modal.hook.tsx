"use client";

import { useModalStore } from "@/app/commons/stores/store";
import Modal from "@/app/commons/components/modal";

export function usePurchaseModal() {
  const { openModal, closeModal } = useModalStore();

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
      </div>
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
      </div>
    );
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
            closeModal();
          }}
          onDropdownChange={(value) => {
            console.log("Selected charge amount:", value);
          }}
        />
      </div>
    );
  };

  return {
    openPurchaseConfirmModal,
    openInsufficientPointModal,
    openChargeModal,
    closeModal,
  };
}
