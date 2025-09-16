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
        ‹
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
        ›
      </button>
    </div>
  );
}
