"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./PaymentMethodModal.module.css";
import * as PortOne from "@portone/browser-sdk/v2";
import { v4 } from "uuid";
import { usePaymentStore } from "@/commons/stores/payment-store";
import { useTransactionStore } from "@/commons/stores/transaction-store";
import { useMutation } from "@apollo/client";
import { CREATE_POINT_TRANSACTION_OF_LOADING } from "./queries";

interface PaymentMethodModalProps {
  isOpen: boolean;
  amount: number;
  onClose: () => void;
  onSelectPayment: (method: "kakaopay" | "nicepay") => void;
}

export default function PaymentMethodModal({
  isOpen,
  amount,
  onClose,
  onSelectPayment,
}: PaymentMethodModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<
    "kakaopay" | "nicepay" | null
  >(null);

  // Zustand 스토어 사용
  const { setPaymentInfo } = usePaymentStore();
  const { setLatestTransaction, updateBalance } = useTransactionStore();
  const [createPointTransactionOfLoading] = useMutation(
    CREATE_POINT_TRANSACTION_OF_LOADING
  );

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

  // 모달이 열릴 때마다 선택 초기화
  useEffect(() => {
    if (isOpen) {
      setSelectedMethod(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSelectMethod = (method: "kakaopay" | "nicepay") => {
    setSelectedMethod(method);
  };

  const handlePayment = async () => {
    if (!selectedMethod) return;

    if (selectedMethod === "kakaopay") {
      const response = await PortOne.requestPayment({
        // Store ID 설정
        storeId: "store-abc39db7-8ee1-4898-919e-0af603a68317",
        // 채널 키 설정
        channelKey: "channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33",
        paymentId: `payment-${v4()}`,
        orderName: `포인트 ${formatNumber(amount)}원 충전`,
        totalAmount: amount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        redirectUrl: "http://aaa.aaaa", //모바일 결제시 결제 후 다시 돌아올 페이지
      });
      console.log("응답", response);
      if (response?.paymentId) {
        setPaymentInfo(response.paymentId, "kakaopay", amount);

        // 포인트 충전 트랜잭션 생성
        try {
          const result = await createPointTransactionOfLoading({
            variables: {
              paymentId: response.paymentId,
            },
          });
          console.log("포인트 충전 성공:", result);

          // Transaction 스토어에 저장
          if (result.data?.createPointTransactionOfLoading) {
            const transaction = result.data.createPointTransactionOfLoading;
            setLatestTransaction(transaction);
            updateBalance(transaction.balance); // 최신 잔액으로 업데이트
          }
        } catch (error) {
          console.error("포인트 충전 실패:", error);
        }
      }
    } else if (selectedMethod === "nicepay") {
      const response = await PortOne.requestPayment({
        // Store ID 설정
        storeId: "store-84cbf471-b5b2-4ac3-8155-a1e15356e5e2",
        // 채널 키 설정
        channelKey: "channel-key-acfa5de7-26e9-4b47-9a27-3bfca389d60e",
        paymentId: `payment-${v4()}`,
        orderName: `포인트 ${formatNumber(amount)}원 충전`,
        totalAmount: amount,
        currency: "CURRENCY_KRW",
        payMethod: "CARD",
        redirectUrl: "http://aaa.aaaa", //모바일 결제시 결제 후 다시 돌아올 페이지
      });
      console.log("응답", response);
      if (response?.paymentId) {
        setPaymentInfo(response.paymentId, "nicepay", amount);

        // 포인트 충전 트랜잭션 생성
        try {
          const result = await createPointTransactionOfLoading({
            variables: {
              paymentId: response.paymentId,
            },
          });
          console.log("포인트 충전 성공:", result);

          // Transaction 스토어에 저장
          if (result.data?.createPointTransactionOfLoading) {
            const transaction = result.data.createPointTransactionOfLoading;
            setLatestTransaction(transaction);
            updateBalance(transaction.balance); // 최신 잔액으로 업데이트
          }
        } catch (error) {
          console.error("포인트 충전 실패:", error);
        }
      }
    }

    onSelectPayment(selectedMethod);
    setSelectedMethod(null);
  };

  const handleCancel = () => {
    setSelectedMethod(null);
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
          <h2 className={styles.title}>결제 수단을 선택해 주세요</h2>

          {/* 충전 금액 표시 */}
          <div className={styles.amountInfo}>
            <span className={styles.amountLabel}>충전 금액</span>
            <span className={styles.amount}>{formatNumber(amount)}원</span>
          </div>

          {/* 결제 수단 선택 영역 */}
          <div className={styles.paymentMethods}>
            {/* 카카오페이 */}
            <div
              className={`${styles.paymentCard} ${
                selectedMethod === "kakaopay" ? styles.paymentCardActive : ""
              }`}
              onClick={() => handleSelectMethod("kakaopay")}
            >
              <div className={styles.radioButton}>
                {selectedMethod === "kakaopay" && (
                  <div className={styles.radioButtonInner} />
                )}
              </div>
              <div className={styles.paymentInfo}>
                <div className={styles.paymentLogo}>
                  <Image
                    src="/images/kakao.png"
                    alt="카카오페이"
                    width={120}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className={styles.paymentDescription}>
                  간편하고 안전한 카카오페이 결제
                </p>
              </div>
            </div>

            {/* 나이스정보통신 */}
            <div
              className={`${styles.paymentCard} ${
                selectedMethod === "nicepay" ? styles.paymentCardActive : ""
              }`}
              onClick={() => handleSelectMethod("nicepay")}
            >
              <div className={styles.radioButton}>
                {selectedMethod === "nicepay" && (
                  <div className={styles.radioButtonInner} />
                )}
              </div>
              <div className={styles.paymentInfo}>
                <div className={styles.paymentLogo}>
                  <Image
                    src="/images/nicepay.png"
                    alt="나이스페이"
                    width={100}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p className={styles.paymentDescription}>
                  신용카드, 계좌이체 등 다양한 결제 수단
                </p>
              </div>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className={styles.buttonArea}>
            <button className={styles.cancelButton} onClick={handleCancel}>
              취소
            </button>
            <button
              className={styles.paymentButton}
              onClick={handlePayment}
              disabled={selectedMethod === null}
            >
              결제하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
