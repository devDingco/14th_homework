"use client";

// import { gql } from "@apollo/client";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "purchase" | "insufficient";
}

export default function PurchaseModal({
  isOpen,
  onClose,
  onConfirm,
  type,
}: PurchaseModalProps) {
  if (!isOpen) return null;

  const content = {
    purchase: {
      title: "해당 숙박권을 구매 하시겠어요?",
      description: "해당 숙박권은 포인트로만 구매 가능합니다.",
      cancelText: "취소",
      confirmText: "구매",
    },
    insufficient: {
      title: "포인트 부족",
      description: "포인트가 부족합니다.\n포인트 충전 후 구매하세요.",
      cancelText: "취소",
      confirmText: "충전",
    },
  };

  const currentContent = content[type];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[24px] w-[480px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Content */}
        <div className="mb-6">
          {/* Title */}
          <h2 className="text-[18px] font-semibold text-center mb-3">
            {currentContent.title}
          </h2>

          {/* Description */}
          <p className="text-[14px] text-[#333333] text-center whitespace-pre-line">
            {currentContent.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="w-[120px] h-[40px] rounded-lg border border-black bg-white text-black text-[14px] font-semibold hover:bg-gray-50 transition-colors"
          >
            {currentContent.cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="w-[120px] h-[40px] rounded-lg bg-[#2974e5] text-white text-[14px] font-semibold hover:bg-[#1e5bbf] transition-colors"
          >
            {currentContent.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
