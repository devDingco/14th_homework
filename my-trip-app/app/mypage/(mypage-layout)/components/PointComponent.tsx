'use client';

import { useState } from 'react';
import { allTransactionData } from "./mock";
import { formatDate, formatAmountSigned, formatNumber, calculatePagination, getPointColorClass } from './tableUtils';
import { PointData, PointTabType, PointTransactionType } from '@lib/types/mypage';
import '../../../global.css';
import './PointTable.css';
import './ActiveButtonGroup.css';

export default function PointComponent() {
  const [activeTab, setActiveTab] = useState<PointTabType>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // 포인트 관련 데이터만 필터링
  const pointData: PointData[] = allTransactionData.map(item => ({
    id: item.id,
    date: item.date,
    type: item.type as PointTransactionType,
    amount: item.amount,
    balance: item.balance
  }));

  // 탭별 데이터 필터링
  let filteredData = pointData;
  if (activeTab === 'charge') filteredData = pointData.filter(r => r.type === '충전');
  else if (activeTab === 'purchase') filteredData = pointData.filter(r => r.type === '구매');
  else if (activeTab === 'sale') filteredData = pointData.filter(r => r.type === '환불');

  const { totalPages, paginatedData } = calculatePagination(filteredData, currentPage, pageSize);

  // 탭별 테이블 설정
  const tabConfig = {
    all: {
      headers: ['날짜', '내용', '거래 및 충전 금액', '잔액'],
      hasSellerColumn: false,
      alignments: ['text-center', 'text-center', 'text-center', 'text-center']
    },
    charge: {
      headers: ['충전일', '결재 ID', '충전내역', '결제 후 잔액'],
      hasSellerColumn: false,
      alignments: ['text-center', 'text-center', 'text-right', 'text-right']
    },
    purchase: {
      headers: ['거래일', '상품 명', '거래내역', '거래 후 잔액', '판매자'],
      hasSellerColumn: true,
      alignments: ['text-center', 'text-left', 'text-right', 'text-right', 'text-center']
    },
    sale: {
      headers: ['거래일', '상품 명', '거래내역', '거래 후 잔액'],
      hasSellerColumn: false,
      alignments: ['text-left', 'text-left', 'text-right', 'text-right']
    }
  };

  const currentConfig = tabConfig[activeTab];

  // 탭별 데이터 표시 형식 설정
  const getDisplayContent = (row: PointData) => {
    const baseContent = {
      all: [formatDate(row.date), row.type, formatAmountSigned(row.amount), formatNumber(row.balance)],
      charge: [formatDate(row.date), `pay_${row.id}`, `+${formatNumber(Math.abs(row.amount))}`, formatNumber(row.balance)],
      purchase: [formatDate(row.date), '여행상품명', `-${formatNumber(Math.abs(row.amount))}`, formatNumber(row.balance), '판매자명'],
      sale: [formatDate(row.date), '여행상품명', `+${formatNumber(Math.abs(row.amount))}`, formatNumber(row.balance)]
    };
    
    return baseContent[activeTab];
  };

  return (
    <div className="point-table-container">
      {/* Active Button Group */}
      <div className="table-toolbar">
        <div className="active-btn-group">
          <button
            type="button"
            className={`btn abg-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('all');
              setCurrentPage(1);
            }}
          >
            전체
          </button>
          <button
            type="button"
            className={`btn abg-btn ${activeTab === 'charge' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('charge');
              setCurrentPage(1);
            }}
          >
            충전내역
          </button>
          <button
            type="button"
            className={`btn abg-btn ${activeTab === 'purchase' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('purchase');
              setCurrentPage(1);
            }}
          >
            구매내역
          </button>
          <button
            type="button"
            className={`btn abg-btn ${activeTab === 'sale' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('sale');
              setCurrentPage(1);
            }}
          >
            판매내역
          </button>
        </div>
      </div>

      {/* Table */}
      <table className={`point-table me_16_20 ${currentConfig.hasSellerColumn ? 'has-seller-column' : ''}`}>
        <thead>
          <tr>
            {currentConfig.headers.map((header, index) => (
              <th key={index} className={currentConfig.alignments[index]}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => {
            const colorClass = getPointColorClass(row.type);
            const displayContent = getDisplayContent(row);

            return (
              <tr key={row.id}>
                {displayContent.map((content, index) => {
                  const isAmountColumn = (activeTab === 'purchase' && index === 2) || 
                            (activeTab !== 'purchase' && activeTab !== 'all' && index === 2) ||
                            (activeTab === 'all' && index === 2);
                  
                  return (
                    <td 
                      key={index} 
                      className={`${currentConfig.alignments[index]} ${isAmountColumn ? colorClass : ''}`}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
