'use client';

import { useState } from 'react';
import { productData, bookMarkData } from "./mock";
import Icon from '@utils/iconColor';
import { formatDate, formatNumber, calculatePagination } from './tableUtils';
import { ProductData, ProductTabType } from '@lib/types/mypage';
import './ProductTable.css';
import './ActiveButtonGroup.css';

export default function HistoryBookmarkComponent() {
  const [activeTab, setActiveTab] = useState<ProductTabType>('my');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const currentData = activeTab === 'my' ? productData : bookMarkData.map(item => ({ ...item, status: item.status || '' }));
  const { totalPages, paginatedData } = calculatePagination(currentData, currentPage, pageSize);

  return (
    <div className="product_table_container">
      {/* Active Button Group */}
      <div className="table-toolbar">
        <div className="active-btn-group">
          <button
            type="button"
            className={`btn abg-btn ${activeTab === 'my' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('my');
              setCurrentPage(1);
            }}
          >
            나의 상품
          </button>
          <button
            type="button"
            className={`btn abg-btn ${activeTab === 'bookmark' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('bookmark');
              setCurrentPage(1);
            }}
          >
            북마크
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="product_table">
        <thead>
          <tr>
            <th className="col_number">번호</th>
            <th className="col_name">상품명</th>
            <th className="col_price">판매가격</th>
            {activeTab === 'bookmark' && <th className="col_seller">판매자</th>}
            <th className="col_date">날짜</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => {
            const status = row.status?.replace(/\s+/g, '');
            const isProductSold = status === '판매완료';
            return (
              <tr key={row.id} className={isProductSold ? 'row_sold' : undefined}>
                <td className="col_number l_14_20">{row.id}</td>
                <td className="col_name me_14_20">
                  {isProductSold ? (
                    <span className="col_name_sold me_14_20">
                      {row.name}
                      <span className="status_badge sold b_14_20">{row.status}</span>
                    </span>
                  ) : (
                    row.name
                  )}
                </td>
                <td className="col_price l_14_20">{formatNumber(row.price)}원</td>
                {activeTab === 'bookmark' && (
                  <td className="col_seller l_14_20">{row.seller || '-'}</td>
                )}
                <td className="col_date l_14_20">
                  {formatDate(row.date)}
                  <span className="delete_button">
                    <Icon outline name="delete" default className="delete_icon"/>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="pagination_btn"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`pagination_btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="pagination_btn"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
