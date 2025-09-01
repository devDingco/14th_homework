import React from 'react';

/**
 * 포인트 충전 내역 페이지
 */
export default function ChargeHistoryPage() {
  return (
    <div className="charge-history-container">
      <div className="page-header">
        <h1>충전 내역</h1>
        <p>포인트 충전 내역을 확인할 수 있습니다.</p>
      </div>

      <div className="charge-summary">
        <div className="summary-card">
          <h3>이번 달 충전 금액</h3>
          <span className="amount">50,000P</span>
        </div>
        <div className="summary-card">
          <h3>총 충전 금액</h3>
          <span className="amount">200,000P</span>
        </div>
      </div>

      <div className="charge-list">
        <div className="charge-item">
          <div className="charge-info">
            <span className="charge-method">카드 결제</span>
            <span className="charge-description">포인트 충전</span>
            <span className="charge-date">2024-01-15 14:30</span>
          </div>
          <div className="charge-amount">+10,000P</div>
          <div className="charge-status completed">완료</div>
        </div>

        <div className="charge-item">
          <div className="charge-info">
            <span className="charge-method">계좌 이체</span>
            <span className="charge-description">포인트 충전</span>
            <span className="charge-date">2024-01-10 09:15</span>
          </div>
          <div className="charge-amount">+20,000P</div>
          <div className="charge-status completed">완료</div>
        </div>

        <div className="charge-item">
          <div className="charge-info">
            <span className="charge-method">카드 결제</span>
            <span className="charge-description">포인트 충전</span>
            <span className="charge-date">2024-01-05 16:45</span>
          </div>
          <div className="charge-amount">+20,000P</div>
          <div className="charge-status failed">실패</div>
        </div>
      </div>

      <div className="charge-button-container">
        <button className="charge-button">포인트 충전하기</button>
      </div>
    </div>
  );
}
