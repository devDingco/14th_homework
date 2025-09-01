'use client';

import { useState } from 'react';
import './TransactionTable.css';

export type TransactionData = {
  id: number;
  date: string;
  productName: string;
  amount: number;
  balance: number;
  type: '충전' | '구매' | '판매';
};

interface TransactionTableProps {
  data: TransactionData[];
  showSeller?: boolean;
  className?: string;
}

export default function TransactionTable({ data, showSeller = false, className = '' }: TransactionTableProps) {
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

  const getAmountColor = (amount: number) => {
    return amount >= 0 ? 'positive' : 'negative';
  };

  const getProductColor = (product: string) => {
    return product === '구매' ? 'negative' : 'positive';
  };

  return (
    <div className={`transaction_table_container ${className}`}>
      <table className="transaction_table">
        <thead className="transaction_table_header">
          <tr className={showSeller ? 'with-seller' : ''}>
            <th className="col-date me_16_20" style={{ color: 'var(--gray-900)' }}>
              날짜
            </th>
            <th className="col-product me_16_20" style={{ color: 'var(--gray-900)' }}>
              내용
            </th>
            <th className="col-amount me_16_20" style={{ color: 'var(--gray-900)' }}>
              거래 및 충전 내역
            </th>
            <th className="col-balance me_16_20" style={{ color: 'var(--gray-900)' }}>
              잔액
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id || index} className={showSeller ? 'with-seller' : ''}>
              <td className="col-date l_14_20">{item.date}</td>
              <td className={`col-product me_14_20 ${getProductColor(item.productName)}`}>{item.productName}</td>
              <td className={`col-amount me_14_20 ${getAmountColor(item.amount)}`}>{formatAmount(item.amount)}</td>
              <td className="col-balance me_14_20">{formatBalance(item.balance)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination_btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination_btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination_btn"
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
