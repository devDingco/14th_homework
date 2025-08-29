'use client';

import { useState } from 'react';
import './TransactionTable.css';

export type TransactionData = {
  id: number;
  date: string;
  productName: string;
  amount: number;
  balance: number;
  seller?: string;
  type?: '충전' | '구매' | '판매';
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

  return (
    <div className={`transaction-table-container ${className}`}>
      <table className="transaction-table">
        <thead>
          <tr>
            <th className="col-date">거래일</th>
            <th className="col-product">상품명</th>
            <th className="col-amount">거래금액</th>
            <th className="col-balance">거래 후 잔액</th>
            {showSeller && <th className="col-seller">판매자</th>}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id || index}>
              <td className="col-date">{formatDate(item.date)}</td>
              <td className="col-product">{item.productName}</td>
              <td className={`col-amount ${getAmountColor(item.amount)}`}>{formatAmount(item.amount)}</td>
              <td className="col-balance">{formatBalance(item.balance)}</td>
              {showSeller && <td className="col-seller">{item.seller}</td>}
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
