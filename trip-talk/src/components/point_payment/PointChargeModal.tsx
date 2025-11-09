"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./PointChargeModal.module.css";

interface PointChargeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

const POINT_OPTIONS = [100, 500, 2000, 5000, 10000, 50000];

export default function PointChargeModal({
  isOpen,
  onClose,
  onConfirm,
}: PointChargeModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 모달 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // 모달이 열릴 때 스크롤 막기
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectAmount = (amount: number) => {
    setSelectedAmount(amount);
    setIsDropdownOpen(false);
  };

  const handleCharge = () => {
    if (selectedAmount !== null) {
      onConfirm(selectedAmount);
      setSelectedAmount(null);
    }
  };

  const handleCancel = () => {
    setSelectedAmount(null);
    setIsDropdownOpen(false);
    onClose();
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString("ko-KR");
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.content}>
          {/* 타이틀 */}
          <h2 className={styles.title}>충전하실 금액을 선택해 주세요</h2>

          {/* 드롭다운 영역 */}
          <div className={styles.dropdownContainer} ref={dropdownRef}>
            <div
              className={`${styles.dropdown} ${
                isDropdownOpen ? styles.dropdownOpen : ""
              }`}
              onClick={toggleDropdown}
            >
              <span
                className={
                  selectedAmount !== null
                    ? styles.selectedText
                    : styles.placeholder
                }
              >
                {selectedAmount !== null
                  ? formatNumber(selectedAmount)
                  : "내용입력"}
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`${styles.arrow} ${
                  isDropdownOpen ? styles.arrowUp : ""
                }`}
              >
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* 드롭다운 리스트 */}
            {isDropdownOpen && (
              <div className={styles.dropdownList}>
                {POINT_OPTIONS.map((amount) => (
                  <div
                    key={amount}
                    className={`${styles.dropdownItem} ${
                      selectedAmount === amount ? styles.dropdownItemActive : ""
                    }`}
                    onClick={() => handleSelectAmount(amount)}
                  >
                    {formatNumber(amount)}
                    {selectedAmount === amount && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={styles.checkIcon}
                      >
                        <path
                          d="M13.3333 4L6 11.3333L2.66667 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 버튼 영역 */}
          <div className={styles.buttonArea}>
            <button className={styles.cancelButton} onClick={handleCancel}>
              취소
            </button>
            <button
              className={styles.chargeButton}
              onClick={handleCharge}
              disabled={selectedAmount === null}
            >
              충전하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
