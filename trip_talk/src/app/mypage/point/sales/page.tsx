import React from 'react';

/**
 * 판매 내역 페이지
 */
export default function SalesHistoryPage() {
  return (
    <div className="sales-history-container">
      <div className="page-header">
        <h1>판매 내역</h1>
        <p>여행 후기, 사진 등을 판매하여 획득한 포인트 내역입니다.</p>
      </div>

      <div className="sales-summary">
        <div className="summary-card">
          <h3>이번 달 판매 수익</h3>
          <span className="amount">12,000P</span>
        </div>
        <div className="summary-card">
          <h3>총 판매 수익</h3>
          <span className="amount">45,000P</span>
        </div>
        <div className="summary-card">
          <h3>판매 상품 수</h3>
          <span className="count">8개</span>
        </div>
      </div>

      <div className="filter-section">
        <select className="period-filter">
          <option value="all">전체 기간</option>
          <option value="month">최근 1개월</option>
          <option value="3months">최근 3개월</option>
          <option value="year">최근 1년</option>
        </select>
        <select className="type-filter">
          <option value="all">전체 유형</option>
          <option value="review">여행 후기</option>
          <option value="photo">사진</option>
          <option value="guide">가이드</option>
        </select>
      </div>

      <div className="sales-list">
        <div className="sales-item">
          <div className="sales-info">
            <h4>부산 여행 후기 - 해운대 맛집 투어</h4>
            <span className="sales-type">여행 후기</span>
            <span className="sales-date">2024-01-13</span>
            <span className="buyer-info">구매자: 김**님</span>
          </div>
          <div className="sales-amount">+3,000P</div>
          <div className="sales-status completed">판매 완료</div>
        </div>

        <div className="sales-item">
          <div className="sales-info">
            <h4>제주도 일출 사진 패키지</h4>
            <span className="sales-type">사진</span>
            <span className="sales-date">2024-01-11</span>
            <span className="buyer-info">구매자: 이**님</span>
          </div>
          <div className="sales-amount">+5,000P</div>
          <div className="sales-status completed">판매 완료</div>
        </div>

        <div className="sales-item">
          <div className="sales-info">
            <h4>경주 문화재 가이드북</h4>
            <span className="sales-type">가이드</span>
            <span className="sales-date">2024-01-09</span>
            <span className="buyer-info">구매자: 박**님</span>
          </div>
          <div className="sales-amount">+4,000P</div>
          <div className="sales-status processing">정산 중</div>
        </div>
      </div>

      <div className="sales-action-container">
        <button className="register-product-button">상품 등록하기</button>
      </div>
    </div>
  );
}
