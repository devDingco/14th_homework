'use client';

import { useState } from 'react';
import './PointTable.css';

export type PointData = {
  id: number;
  date: string;
  type: '충전' | '구매' | '사용' | '환불';
  amount: number;
  balance: number;
};

interface PointTableProps {
  data: PointData[];
  className?: string;
}

export default function PointTable({ data, className = '' }: PointTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatAmount = (amount: number) => {
    const sign = amount >= 0 ? '+' : '';
    const formatted = Math.abs(amount).toLocaleString();
    return `${sign}${formatted}`;
  };

  const formatBalance = (balance: number) => {
    return balance.toLocaleString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case '충전':
      case '환불':
        return 'positive';
      case '구매':
      case '사용':
        return 'negative';
      default:
        return 'neutral';
    }
  };

  const getTypeText = (type: string) => {
    return type;
  };

  return (
    <div className={`point-table-container ${className}`}>
      <table className="point-table">
        <thead>
          <tr>
            <th className="col-date">날짜</th>
            <th className="col-type">내용</th>
            <th className="col-amount">거래 및 충전 금액</th>
            <th className="col-balance">잔액</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id || index}>
              <td className="col-date">{formatDate(item.date)}</td>
              <td className={`col-type ${getTypeColor(item.type)}`}>{getTypeText(item.type)}</td>
              <td className={`col-amount ${getTypeColor(item.type)}`}>{formatAmount(item.amount)}</td>
              <td className="col-balance">{formatBalance(item.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
