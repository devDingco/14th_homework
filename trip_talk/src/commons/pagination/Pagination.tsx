'use client';

import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ currentPage, totalPages, onPageChange, className = '' }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pagesPerGroup = 5;
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const totalGroups = Math.ceil(totalPages / pagesPerGroup);

  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const handlePrevGroup = () => {
    const prevGroupLastPage = (currentGroup - 2) * pagesPerGroup + pagesPerGroup;
    onPageChange(Math.min(prevGroupLastPage, totalPages));
  };

  const handleNextGroup = () => {
    const nextGroupFirstPage = currentGroup * pagesPerGroup + 1;
    onPageChange(Math.min(nextGroupFirstPage, totalPages));
  };

  return (
    <div className={`pagination ${className}`}>
      <button className="pagination_btn" disabled={currentGroup === 1} onClick={handlePrevGroup}>
        &lt;
      </button>
      <div className="pagination_btn_wrapper">
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
          <button
            key={page}
            className={`pagination_btn ${currentPage === page ? 'active sb_16_24' : 'r_16_24'}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <button className="pagination_btn" disabled={currentGroup === totalGroups} onClick={handleNextGroup}>
        &gt;
      </button>
    </div>
  );
}
