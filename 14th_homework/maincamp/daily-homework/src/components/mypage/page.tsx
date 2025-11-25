'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './styles.module.css';
import usePasswordChange, { usePointChargeHistory } from './hook';
import { gql, useMutation, useQuery } from '@apollo/client';
import * as PortOne from '@portone/browser-sdk/v2';
import { v4 } from 'uuid';

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

export default function MypageComponent() {
  const [selectedMenu, setSelectedMenu] = useState('내 게시글');
  const [isChargeModalOpen, setIsChargeModalOpen] = useState(false);
  const [chargeAmount, setChargeAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  // 비밀번호 변경 hook 사용
  const {
    currentPassword,
    newPassword,
    confirmPassword,
    passwordError,
    successMessage,
    onChangeCurrentPassword,
    onChangeNewPassword,
    onChangeConfirmPassword,
    onClickResetPassword,
  } = usePasswordChange();

  // 포인트 충전 내역 hook 사용
  const {
    pointTransactions,
    totalPoint,
    loading: pointLoading,
    error: pointError,
    refetch: refetchPointHistory,
  } = usePointChargeHistory();

  // 디버깅: 데이터 확인
  console.log('포인트 충전 내역:', {
    loading: pointLoading,
    error: pointError,
    transactions: pointTransactions,
    length: pointTransactions?.length,
  });

  // GraphQL mutation 및 query
  const [createPointTransactionOfLoading] = useMutation(CREATE_POINT_TRANSACTION_OF_LOADING);
  const { data: userData } = useQuery(FETCH_USER_LOGGED_IN);
  const user = userData?.fetchUserLoggedIn;

  // 비밀번호 변경 폼 렌더링
  const renderPasswordChangeForm = () => {
    return (
      <div className={styles.passwordForm}>
        <div className={styles.formGroup}>
          <label className={styles.label}>현재 비밀번호</label>
          <input
            type="password"
            placeholder="현재 비밀번호를 입력해 주세요."
            value={currentPassword}
            onChange={onChangeCurrentPassword}
            className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>새 비밀번호</label>
          <input
            type="password"
            placeholder="새 비밀번호를 입력해 주세요. (8자 이상)"
            value={newPassword}
            onChange={onChangeNewPassword}
            className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>새 비밀번호 확인</label>
          <input
            type="password"
            placeholder="새 비밀번호를 다시 입력해 주세요."
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
            className={`${styles.input} ${passwordError ? styles.inputError : ''}`}
          />
        </div>

        {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

        <button onClick={onClickResetPassword} className={styles.submitButton}>
          비밀번호 변경
        </button>
      </div>
    );
  };

  // 포인트 충전 내역 렌더링
  const renderPointChargeHistory = () => {
    if (pointLoading) {
      return <div className={styles.emptyMessage}>로딩 중...</div>;
    }

    if (pointError) {
      console.error('포인트 충전 내역 에러:', pointError);
      return (
        <div className={styles.errorMessage}>
          포인트 충전 내역을 불러오는 중 오류가 발생했습니다.
          <br />
          {pointError.message || '알 수 없는 오류가 발생했습니다.'}
        </div>
      );
    }

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    };

    const formatAmount = (amount: number) => {
      const formatted = new Intl.NumberFormat('ko-KR').format(amount);
      return `${formatted} P`;
    };

    return (
      <div className={styles.pointHistoryContainer}>
        {/* 총 포인트 표시 */}
        <div className={styles.totalPointSection}>
          <div className={styles.totalPointLabel}>총 포인트</div>
          <div className={styles.totalPointAmount}>{formatAmount(totalPoint)}</div>
        </div>

        {/* 포인트 충전 내역 테이블 */}
        <div className={styles.pointHistoryTable}>
          <div className={styles.pointHistoryHeader}>
            <div className={styles.pointHistoryHeaderCell}>충전일시</div>
            <div className={styles.pointHistoryHeaderCell}>충전금액</div>
            <div className={styles.pointHistoryHeaderCell}>잔액</div>
            <div className={styles.pointHistoryHeaderCell}>상태</div>
          </div>
          <div className={styles.pointHistoryBody}>
            {pointTransactions.length === 0 ? (
              <div className={styles.emptyMessage}>충전 내역이 없습니다.</div>
            ) : (
              pointTransactions.map((transaction: any) => (
                <div key={transaction._id} className={styles.pointHistoryRow}>
                  <div className={styles.pointHistoryCell}>{formatDate(transaction.createdAt)}</div>
                  <div className={styles.pointHistoryCell}>
                    <span className={styles.pointAmount}>
                      +{formatAmount(transaction.amount || 0)}
                    </span>
                  </div>
                  <div className={styles.pointHistoryCell}>
                    {formatAmount(transaction.balance || 0)}
                  </div>
                  <div className={styles.pointHistoryCell}>
                    <span
                      className={`${styles.pointStatus} ${
                        transaction.status === 'PAID'
                          ? styles.pointStatusSuccess
                          : styles.pointStatusPending
                      }`}
                    >
                      {transaction.status === 'PAID' ? '완료' : transaction.statusDetail || '대기'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // 충전 모달 열기
  const handleOpenChargeModal = () => {
    setIsChargeModalOpen(true);
  };

  // 충전 모달 닫기
  const handleCloseChargeModal = () => {
    setIsChargeModalOpen(false);
    setChargeAmount('');
  };

  // 충전 확인
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
        // Store ID 설정
        storeId: 'store-abc39db7-8ee1-4898-919e-0af603a68317',
        // 채널 키 설정
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

          // 포인트 충전 내역 새로고침
          refetchPointHistory();
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
              refetchPointHistory();
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
    <div className={styles.container}>
      <div className={styles.layout}>
        {/* 좌측 사이드바 */}
        <aside className={styles.sidebar}>
          {/* 최상단 프로필 */}
          <div className={styles.profileCard}>
            <div className={styles.profileImage}>
              <img src="/profile.svg" alt="프로필" />
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{user?.name || '사용자'}</h2>
              <p className={styles.profileEmail}>{user?.email || ''}</p>
            </div>
          </div>

          {/* 메뉴 리스트 */}
          <nav className={styles.menuList}>
            <div className={styles.menuGroup}>
              <h3 className={styles.menuGroupTitle}>내 활동</h3>
              <div className={styles.menuItems}>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '내 게시글' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('내 게시글')}
                >
                  <span className={styles.menuIcon}>📝</span>
                  <span className={styles.menuLabel}>내 게시글</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '내 댓글' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('내 댓글')}
                >
                  <span className={styles.menuIcon}>💬</span>
                  <span className={styles.menuLabel}>내 댓글</span>
                </button>
                <button
                  className={`${styles.menuItem} ${selectedMenu === '좋아요' ? styles.active : ''}`}
                  onClick={() => setSelectedMenu('좋아요')}
                >
                  <span className={styles.menuIcon}>⭐</span>
                  <span className={styles.menuLabel}>좋아요</span>
                </button>
              </div>
            </div>

            <div className={styles.menuGroup}>
              <h3 className={styles.menuGroupTitle}>예약/구매</h3>
              <div className={styles.menuItems}>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '포인트 충전 내역' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('포인트 충전 내역')}
                >
                  <span className={styles.menuIcon}>💰</span>
                  <span className={styles.menuLabel}>포인트 충전 내역</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '구매내역' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('구매내역')}
                >
                  <span className={styles.menuIcon}>🛒</span>
                  <span className={styles.menuLabel}>구매내역</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '나의 예약 확인' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('나의 예약 확인')}
                >
                  <span className={styles.menuIcon}>📅</span>
                  <span className={styles.menuLabel}>나의 예약 확인</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '찜 목록' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('찜 목록')}
                >
                  <span className={styles.menuIcon}>❤️</span>
                  <span className={styles.menuLabel}>찜 목록</span>
                </button>
              </div>
            </div>

            <div className={styles.menuGroup}>
              <h3 className={styles.menuGroupTitle}>설정</h3>
              <div className={styles.menuItems}>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '프로필 수정' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('프로필 수정')}
                >
                  <span className={styles.menuIcon}>👤</span>
                  <span className={styles.menuLabel}>프로필 수정</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '비밀번호 변경' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('비밀번호 변경')}
                >
                  <span className={styles.menuIcon}>🔒</span>
                  <span className={styles.menuLabel}>비밀번호 변경</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '알림 설정' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('알림 설정')}
                >
                  <span className={styles.menuIcon}>🔔</span>
                  <span className={styles.menuLabel}>알림 설정</span>
                </button>
                <button
                  className={`${styles.menuItem} ${
                    selectedMenu === '로그아웃' ? styles.active : ''
                  }`}
                  onClick={() => setSelectedMenu('로그아웃')}
                >
                  <span className={styles.menuIcon}>🚪</span>
                  <span className={styles.menuLabel}>로그아웃</span>
                </button>
              </div>
            </div>
          </nav>
        </aside>

        {/* 우측 메인 콘텐츠 영역 */}
        <main className={styles.mainContent}>
          <div className={styles.contentHeader}>
            <h1 className={styles.contentTitle}>{selectedMenu}</h1>
            {selectedMenu === '포인트 충전 내역' && (
              <button className={styles.chargeButton} onClick={handleOpenChargeModal}>
                충전하기
              </button>
            )}
          </div>
          <div
            className={`${styles.contentBody} ${
              selectedMenu === '포인트 충전 내역' &&
              pointTransactions &&
              pointTransactions.length > 0
                ? styles.contentBodyWithData
                : ''
            }`}
          >
            {selectedMenu === '비밀번호 변경' ? (
              renderPasswordChangeForm()
            ) : selectedMenu === '포인트 충전 내역' ? (
              renderPointChargeHistory()
            ) : (
              <p className={styles.emptyMessage}>{selectedMenu} 페이지는 준비 중입니다.</p>
            )}
          </div>
        </main>
      </div>

      {/* 포인트 충전 모달 */}
      {isChargeModalOpen && (
        <div className={styles.modalOverlay} onClick={handleCloseChargeModal}>
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
                onClick={handleCloseChargeModal}
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
    </div>
  );
}
