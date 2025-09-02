'use client';

import { useState } from 'react';
import './ProductTable.css';
import Image from 'next/image';
import Pagination from '../../../pagination/Pagination';

interface ProductData {
  id: number;
  name: string;
  price: number;
  date: string;
  status?: string;
}

interface ProductTableProps {
  data: ProductData[];
  className?: string;
}

export default function ProductTable({ data, className = '' }: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Array.isArray(data) ? Math.ceil(data.length / itemsPerPage) : 0;

  if (!data || data.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString() + '원';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formattedDate.replace(/\.$/, ''); // 맨 끝 점 제거
  };

  return (
    <div className="product_table_container">
      <table className="product_table">
        <thead className="product_table_header">
          <tr>
            <th className="col_number" style={{ color: 'var(--gray-900)' }}>
              번호
            </th>
            <th className="col_name" style={{ color: 'var(--gray-900)' }}>
              상품명
            </th>
            <th className="col_price" style={{ color: 'var(--gray-900)' }}>
              판매가격
            </th>
            <th className="col_date" style={{ color: 'var(--gray-900)' }}>
              날짜
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td className="col_number l_14_20">{item.id}</td>
              {item.status ? (
                item.status === '판매완료' ? (
                  <td className="col_name_sold me_14_20">
                    {item.name}
                    <span className="status_badge sold b_14_20">{item.status}</span>
                  </td>
                ) : (
                  <td className="col_name me_14_20">{item.name}</td>
                )
              ) : (
                <td className="col_name me_14_20">{item.name}</td>
              )}
              <td className="col_price l_14_20">{formatPrice(item.price)}</td>
              <td className="col_date l_14_20">
                {formatDate(item.date)}
                <span className="delete_button">
                  <Image src="/icons/delete_icon.svg" alt="delete" width={24} height={24} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
