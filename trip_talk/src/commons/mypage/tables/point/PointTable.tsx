'use client';

import { useState } from 'react';
import './PointTable.css';
import Pagination from '../../../pagination/Pagination';

export type PointData = {
  id: number;
  date: string;
  content: string;
  amount: number;
  balance: number;
  status?: string;
  type?: '충전' | '구매' | '판매';
};

interface PointTableProps {
  data: PointData[];
  tableType: 'charge' | 'purchase' | 'sales';
  className?: string;
}

export default function PointTable({ data, tableType, className = '' }: PointTableProps) {
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

  const getTableHeaders = () => {
    switch (tableType) {
      case 'charge':
        return {
          col2: '내용',
          col3: '충전 포인트',
          col4: '기존 포인트',
        };
      case 'purchase':
        return {
          col2: '상품명',
          col3: '사용 포인트',
          col4: '기존 포인트',
        };
      case 'sales':
        return {
          col2: '상품명',
          col3: '판매 포인트',
          col4: '기존 포인트',
        };
      default:
        return {
          col2: '내용',
          col3: '거래 및 충전 금액',
          col4: '잔액',
        };
    }
  };

  const headers = getTableHeaders();
  const getGridClass = () => `${tableType}-grid`;

  return (
    <div className={`point_table_container ${className}`}>
      <table className="point_table">
        <thead className="point_table_header">
          <tr className={getGridClass()}>
            <th className="col-date" style={{ color: 'var(--gray-900)' }}>
              날짜
            </th>
            <th className="col-content" style={{ color: 'var(--gray-900)' }}>
              {headers.col2}
            </th>
            <th className="col-amount" style={{ color: 'var(--gray-900)' }}>
              {headers.col3}
            </th>
            <th className="col-balance" style={{ color: 'var(--gray-900)' }}>
              {headers.col4}
            </th>
            {tableType === 'purchase' && (
              <th className="col-status" style={{ color: 'var(--gray-900)' }}>
                상태
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id || index} className={getGridClass()}>
              <td className="col-date l_14_20">{item.date}</td>
              <td className="col-content me_14_20">{item.content}</td>
              <td className={`col-amount l_14_20 ${getAmountColor(item.amount)}`}>{formatAmount(item.amount)}</td>
              <td className="col-balance l_14_20">{formatBalance(item.balance)}</td>
              {tableType === 'purchase' && <td className="col-status l_14_20">{item.status}</td>}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
