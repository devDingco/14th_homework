'use client';

import usePagination from './hook';
import { PaginationProps } from './types';
import * as S from './styles';

export default function PaginationComponent({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) {
  const {
    onClickPrevGroup,
    onClickNextGroup,
    onClickPage,
    getPageNumbers,
    hasPrevGroup,
    hasNextGroup,
  } = usePagination(currentPage, lastPage, onPageChange);

  return (
    <div style={S.paginationContainer}>
      {/* 이전 5개 페이지 그룹으로 이동 */}
      <button
        onClick={onClickPrevGroup}
        disabled={!hasPrevGroup}
        style={!hasPrevGroup ? S.disabledButton : S.arrowButton}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
            fill={hasPrevGroup ? '#5F6368' : '#ccc'}
          />
        </svg>
      </button>

      {/* 페이지 번호들 (최대 5개) */}
      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onClickPage(pageNumber)}
          style={currentPage === pageNumber ? S.activeButton : S.paginationButton}
        >
          {pageNumber}
        </button>
      ))}

      {/* 다음 5개 페이지 그룹으로 이동 */}
      <button
        onClick={onClickNextGroup}
        disabled={!hasNextGroup}
        style={!hasNextGroup ? S.disabledButton : S.arrowButton}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z"
            fill={hasNextGroup ? '#5F6368' : '#ccc'}
          />
        </svg>
      </button>
    </div>
  );
}
