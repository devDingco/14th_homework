"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

interface ModalProps {
  variant?: "info" | "danger";
  actions: "single" | "dual" | "cash";
  theme?: "light" | "dark";
  title: string;
  description?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  dropdownOptions?: Array<{ value: string; label: string }>;
  onDropdownChange?: (value: string) => void;
}

export default function Modal({
  variant = "info",
  actions,
  theme = "light",
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
  dropdownOptions = [],
  onDropdownChange,
}: ModalProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (value: string, label: string) => {
    setSelectedOption(label);
    setIsDropdownOpen(false);
    if (onDropdownChange) {
      onDropdownChange(value);
    }
  };

  const modalClassName = `${styles.modal} ${styles[`modal--${variant}`]} ${
    styles[`modal--${theme}`]
  }`;
  const contentClassName = `${styles.modal__content} ${
    actions === "cash" ? styles["modal__content--cash"] : ""
  }`;

  return (
    <div className={modalClassName} onClick={(e) => e.stopPropagation()}>
      <div className={contentClassName}>
        <div className={styles.modal__textArea}>
          <h2 className={styles.modal__title}>{title}</h2>
          {description && <p className={styles.modal__description}>{description}</p>}
        </div>

        {actions === "cash" && (
          <div className={styles.modal__dropdownWrapper}>
            <button
              type="button"
              className={styles.modal__dropdown}
              onClick={handleDropdownToggle}
              data-testid="modal-dropdown"
            >
              <span
                className={
                  selectedOption
                    ? styles.modal__dropdown__text
                    : styles.modal__dropdown__placeholder
                }
              >
                {selectedOption || "내용입력"}
              </span>
              <Image
                src="/icons/filled/down_arrow.svg"
                alt="dropdown arrow"
                width={24}
                height={24}
              />
            </button>
            {isDropdownOpen && (
              <div className={styles.modal__dropdownList}>
                {dropdownOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={styles.modal__dropdownItem}
                    onClick={() => handleOptionSelect(option.value, option.label)}
                    data-testid="modal-dropdown-option"
                  >
                    <span className={styles.modal__dropdownItem__text}>
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={styles.modal__buttonArea}>
        {actions === "single" ? (
          <button
            type="button"
            className={`${styles.modal__button} ${styles["modal__button--primary"]}`}
            onClick={onConfirm}
            data-testid="modal-confirm-button"
          >
            {confirmText}
          </button>
        ) : (
          <>
            <button
              type="button"
              className={`${styles.modal__button} ${styles["modal__button--secondary"]}`}
              onClick={onCancel}
              data-testid="modal-cancel-button"
            >
              {cancelText}
            </button>
            <button
              type="button"
              className={`${styles.modal__button} ${styles["modal__button--primary"]}`}
              onClick={onConfirm}
              data-testid="modal-confirm-button"
            >
              {confirmText}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
