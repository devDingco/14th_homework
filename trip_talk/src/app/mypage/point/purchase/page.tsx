import React from 'react';

/**
 * 구매 내역 페이지
 */
export default function PurchaseHistoryPage() {
  return (
    <div className="purchase-history-container">
      <div className="page-header">
        <h1>구매 내역</h1>
        <p>포인트로 구매한 상품 내역을 확인할 수 있습니다.</p>
      </div>

      <div className="purchase-summary">
        <div className="summary-card">
          <h3>이번 달 구매</h3>
          <span className="count">3건</span>
          <span className="amount">15,000P</span>
        </div>
        <div className="summary-card">
          <h3>총 구매</h3>
          <span className="count">12건</span>
          <span className="amount">85,000P</span>
        </div>
      </div>

      <div className="filter-section">
        <select className="period-filter">
          <option value="all">전체 기간</option>
          <option value="month">최근 1개월</option>
          <option value="3months">최근 3개월</option>
          <option value="year">최근 1년</option>
        </select>
        <select className="category-filter">
          <option value="all">전체 카테고리</option>
          <option value="accommodation">숙박</option>
          <option value="tour">투어</option>
          <option value="transport">교통</option>
        </select>
      </div>

      <div className="purchase-list">
        <div className="purchase-item">
          <div className="purchase-info">
            <h4>부산 해운대 호텔 예약</h4>
            <span className="purchase-category">숙박</span>
            <span className="purchase-date">2024-01-14</span>
            <span className="purchase-id">주문번호: #TR240114001</span>
          </div>
          <div className="purchase-amount">-5,000P</div>
          <div className="purchase-status confirmed">예약 확정</div>
        </div>

        <div className="purchase-item">
          <div className="purchase-info">
            <h4>제주도 렌터카 예약</h4>
            <span className="purchase-category">교통</span>
            <span className="purchase-date">2024-01-12</span>
            <span className="purchase-id">주문번호: #TR240112002</span>
          </div>
          <div className="purchase-amount">-8,000P</div>
          <div className="purchase-status confirmed">예약 확정</div>
        </div>

        <div className="purchase-item">
          <div className="purchase-info">
            <h4>경주 문화재 투어</h4>
            <span className="purchase-category">투어</span>
            <span className="purchase-date">2024-01-10</span>
            <span className="purchase-id">주문번호: #TR240110003</span>
          </div>
          <div className="purchase-amount">-2,000P</div>
          <div className="purchase-status cancelled">취소됨</div>
        </div>
      </div>
    </div>
  );
}
