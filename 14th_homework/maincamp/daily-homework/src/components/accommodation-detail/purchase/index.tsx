'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import * as PortOne from '@portone/browser-sdk/v2';
import { v4 } from 'uuid';
import { gql, useMutation, useQuery } from '@apollo/client';

const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($paymentId: ID!) {
    createPointTransactionOfLoading(paymentId: $paymentId) {
      _id
      impUid
      amount
      balance
      status
      statusDetail
      createdAt
    }
  }
`;

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
    }
  }
`;

interface PurchaseProps {
  price?: number;
  sellerName?: string;
  sellerImage?: string;
}

export default function Purchase({
  price = 32500,
  sellerName = '김상훈',
  sellerImage = '/profile.svg',
}: PurchaseProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInsufficientPointModalOpen, setIsInsufficientPointModalOpen] = useState(false);
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [chargeAmount, setChargeAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // GraphQL mutation 및 query
  const [createPointTransactionOfLoading] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);
  const { data: userData } = useQuery(FETCH_USER_LOGGED_IN);
  const user = userData?.fetchUserLoggedIn;

  const handlePurchaseClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    // 구매 확인 로직 추가 가능
    // 포인트 부족 체크 후 모달 표시
    // 임시로 포인트 부족 모달 표시
    setIsModalOpen(false);
    setIsInsufficientPointModalOpen(true);
  };

  const handleInsufficientPointCancel = () => {
    setIsInsufficientPointModalOpen(false);
  };

  const handleCharge = () => {
    // 포인트 부족 모달을 닫고 포인트 충전 모달을 엽니다
    setIsInsufficientPointModalOpen(false);
    setIsChargeModalOpen(true);
  };

  const handleChargeModalCancel = () => {
    setIsChargeModalOpen(false);
  };

  const handleChargeConfirm = async () => {
    // 충전 금액 검증
    if (!chargeAmount || Number(chargeAmount) <= 0) {
      alert('충전하실 금액을 선택해 주세요.');
      return;
    }

    setIsProcessing(true);

    try {
      // 고유한 paymentId 생성
      const paymentId = `payment-${v4()}`;

      // 포트원 결제 요청
      const response = await PortOne.requestPayment({
        // Store ID 설정 (mypage와 동일하게 설정)
        storeId: 'store-abc39db7-8ee1-4898-919e-0af603a68317',
        // 채널 키 설정 (mypage와 동일하게 설정)
        channelKey: 'channel-key-1dc10cea-ec89-471d-aedf-f4bd68993f33',
        paymentId: paymentId,
        orderName: '포인트 충전',
        totalAmount: Number(chargeAmount),
        currency: 'CURRENCY_KRW',
        payMethod: 'EASY_PAY',
        easyPay: {
          easyPayProvider: 'KAKAOPAY',
        },
        customer: {
          customerId: user?._id || 'guest',
          fullName: user?.name || '고객',
          phoneNumber: '010-0000-0000',
          email: user?.email || 'customer@example.com',
          address: {
            country: 'KR',
            addressLine1: '서울시',
            addressLine2: '',
            city: '서울',
          },
          zipcode: '00000',
        },
        redirectUrl: window.location.href,
      });

      // response가 없는 경우 처리
      if (!response) {
        alert('결제 응답을 받지 못했습니다. 다시 시도해 주세요.');
        return;
      }

      // 디버깅: 응답 구조 확인 - 모든 필드 출력
      // console.log('PortOne 응답 전체:', JSON.stringify(response, null, 2));
      // console.log('응답 객체 키들:', Object.keys(response || {}));
      // console.log('응답 코드:', (response as any).code);
      // console.log('응답 상태:', (response as any).status);
      // console.log('거래 타입:', (response as any).transactionType);
      // console.log('거래 ID:', (response as any).txId);
      // console.log('Payment ID:', (response as any).paymentId);
      // console.log('impUid:', (response as any).impUid);
      // console.log('모든 필드:', response);

      // 결제 성공 시 - PortOne V2에서는 transactionType과 txId로 성공 여부를 판단
      // transactionType이 "PAYMENT"이고 txId가 존재하면 결제 성공으로 간주
      const isSuccess =
        ((response as any).transactionType === 'PAYMENT' && (response as any).txId) ||
        (response as any).code === 'PAYMENT_SUCCESS' ||
        (response as any).code === 'SUCCESS' ||
        (response as any).status === 'PAID' ||
        (response as any).status === 'SUCCESS';

      if (isSuccess) {
        // GraphQL mutation 호출하여 포인트 충전 처리
        // PortOne 응답에서 실제 paymentId를 가져옴 (응답에 없으면 요청 시 사용한 paymentId 사용)
        const actualPaymentId = (response as any).paymentId || paymentId;
        console.log('Mutation에 전달할 paymentId:', actualPaymentId);

        try {
          const result = await createPointTransactionOfLoading({
            variables: {
              paymentId: actualPaymentId,
            },
          });

          console.log('포인트 충전 성공:', result.data);
          alert('포인트 충전이 완료되었습니다.');
          setIsChargeModalOpen(false);
          setChargeAmount('');

          // 페이지 새로고침 또는 포인트 정보 갱신
          window.location.reload();
        } catch (mutationError: any) {
          console.error('포인트 충전 mutation 실패:', mutationError);
          console.error('에러 상세:', {
            message: mutationError.message,
            graphQLErrors: mutationError.graphQLErrors,
            networkError: mutationError.networkError,
            usedPaymentId: actualPaymentId,
            responsePaymentId: (response as any).paymentId,
            responseTxId: (response as any).txId,
          });

          // 404 에러인 경우 paymentId 대신 txId를 시도
          // networkError 또는 message에 404가 포함되어 있으면 재시도
          const is404Error =
            mutationError.networkError?.statusCode === 404 ||
            mutationError.message?.includes('404') ||
            mutationError.graphQLErrors?.some(
              (err: any) => err.message?.includes('404') || err.extensions?.statusCode === 404
            );

          if (is404Error && (response as any).txId) {
            console.log('404 에러 발생, txId로 재시도:', (response as any).txId);
            try {
              const retryResult = await createPointTransactionOfLoading({
                variables: {
                  paymentId: (response as any).txId,
                },
              });
              console.log('txId로 포인트 충전 성공:', retryResult.data);
              alert('포인트 충전이 완료되었습니다.');
              setIsChargeModalOpen(false);
              setChargeAmount('');
              window.location.reload();
              return;
            } catch (retryError: any) {
              console.error('txId로도 실패:', retryError);
            }
          }

          alert('포인트 충전 처리 중 오류가 발생했습니다. 고객센터로 문의해 주세요.');
        }
      } else {
        // 결제 실패 또는 취소
        console.log('결제 실패 또는 취소:', response);
        const isUserCancel =
          (response as any).code === 'USER_CANCEL' ||
          (response as any).code === 'CANCEL' ||
          (response as any).status === 'CANCELLED' ||
          (response as any).transactionType === 'CANCELLATION';

        if (!isUserCancel) {
          alert('결제가 완료되지 않았습니다.');
        }
      }
    } catch (error: any) {
      console.error('결제 요청 실패:', error);
      alert('결제 요청 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {/* 가격 및 구매 */}
        <div className={styles.priceSection}>
          <div className={styles.priceInfo}>
            <div className={styles.priceGroup}>
              <span className={styles.price}>{price.toLocaleString()}</span>
              <span className={styles.unit}>원</span>
            </div>
            <div className={styles.noticeGroup}>
              <p className={styles.notice}>
                숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
              </p>
              <p className={styles.noticeSmall}>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</p>
            </div>
          </div>
          <button className={styles.purchaseButton} onClick={handlePurchaseClick}>
            구매하기
          </button>
        </div>

        {/* 판매자 정보 */}
        <div className={styles.sellerSection}>
          <h3 className={styles.sellerTitle}>판매자</h3>
          <div className={styles.sellerProfile}>
            <div className={styles.sellerImage}>
              <Image src={sellerImage} alt={sellerName} fill className={styles.profileImg} />
            </div>
            <span className={styles.sellerName}>{sellerName}</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* 구매 확인 모달 */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCancel}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>해당 숙박권을 구매 하시겠어요?</h2>
              <p className={styles.modalDescription}>해당 숙박권은 포인트로만 구매 가능합니다.</p>
            </div>
            <div className={styles.modalButtons}>
              <button className={styles.cancelButton} onClick={handleCancel}>
                취소
              </button>
              <button className={styles.confirmButton} onClick={handleConfirm}>
                구매
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 포인트 부족 모달 */}
      {isInsufficientPointModalOpen && (
        <div className={styles.modalOverlay} onClick={handleInsufficientPointCancel}>
          <div
            className={styles.insufficientPointModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>포인트 부족</h2>
              <p className={styles.modalDescription}>
                포인트가 부족합니다.
                <br />
                포인트 충전 후 구매하세요.
              </p>
            </div>
            <div className={styles.modalButtons}>
              <button className={styles.cancelButton} onClick={handleInsufficientPointCancel}>
                취소
              </button>
              <button className={styles.confirmButton} onClick={handleCharge}>
                충전
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 포인트 충전 모달 */}
      {isChargeModalOpen && (
        <div className={styles.modalOverlay} onClick={handleChargeModalCancel}>
          <div className={styles.chargeModalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.chargeModalHeader}>
              <div className={styles.chargeModalLogo}>
                <Image
                  src="/filled/pointcharge.svg"
                  alt="포인트 충전"
                  width={80}
                  height={56}
                  className={styles.logoImage}
                />
              </div>
              <h2 className={styles.modalTitle}>충전하실 금액을 선택해 주세요</h2>
            </div>
            <div className={styles.chargeModalDropdown}>
              <select
                className={styles.dropdownSelect}
                value={chargeAmount}
                onChange={(e) => setChargeAmount(e.target.value)}
                disabled={isProcessing}
              >
                <option value="">충전 금액을 선택해 주세요</option>
                <option value="100">100원</option>
                <option value="500">500원</option>
                <option value="2000">2,000원</option>
                <option value="5000">5,000원</option>
                <option value="10000">10,000원</option>
                <option value="50000">50,000원</option>
              </select>
            </div>
            <div className={styles.modalButtons}>
              <button
                className={styles.cancelButton}
                onClick={handleChargeModalCancel}
                disabled={isProcessing}
              >
                취소
              </button>
              <button
                className={styles.confirmButton}
                onClick={handleChargeConfirm}
                disabled={isProcessing}
              >
                {isProcessing ? '처리 중...' : '충전하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
