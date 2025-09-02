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
          col1: '충전일',
          col2: '결제 ID',
          col3: '충전 내역',
          col4: '거래 후 잔액',
        };
      case 'purchase':
        return {
          col1: '거래일',
          col2: '상품 명',
          col3: '거래 내역',
          col4: '거래 후 잔액',
        };
      case 'sales':
        return {
          col1: '거래일',
          col2: '상품 명',
          col3: '거래 내역',
          col4: '거래 후 잔액',
        };
    }
  };

  const headers = getTableHeaders();
  const getGridClass = () => `p_table_${tableType}-grid`;

  return (
    <div className={`p_table_container ${className}`}>
      <table className="p_table_point_table">
        <thead className="p_table_point_table_header">
          <tr className={getGridClass()}>
            <th className="p_table_col-date me_16_20" style={{ color: 'var(--gray-900)' }}>
              {headers.col1}
            </th>
            <th className="p_table_col-content me_16_20" style={{ color: 'var(--gray-900)', textAlign: 'left' }}>
              {headers.col2}
            </th>
            <th className="p_table_col-amount me_16_20" style={{ color: 'var(--gray-900)' }}>
              {headers.col3}
            </th>
            <th className="p_table_col-balance me_16_20" style={{ color: 'var(--gray-900)' }}>
              {headers.col4}
            </th>
            {tableType === 'purchase' && (
              <th className="p_table_col-status me_16_20" style={{ color: 'var(--gray-900)' }}>
                판매자
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id || index} className={getGridClass()}>
              <td className="p_table_col-date l_14_20">{item.date}</td>
              <td className="p_table_col-content sb_14_20">{item.content}</td>
              <td className={`p_table_col-amount me_14_20 ${getAmountColor(item.amount)}`}>
                {formatAmount(item.amount)}
              </td>
              <td className="p_table_col-balance me_14_20">{formatBalance(item.balance)}</td>
              {tableType === 'purchase' && <td className="p_table_col-status l_14_20">{item.status}</td>}
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
