import { PaginationHookResult } from './types';

export default function usePagination(
  currentPage: number,
  lastPage: number,
  onPageChange: (page: number) => void
): PaginationHookResult {
  // 현재 페이지 그룹의 시작 페이지 계산 (5개씩)
  const currentGroup = Math.ceil(currentPage / 5);
  const groupStartPage = (currentGroup - 1) * 5 + 1;
  const groupEndPage = Math.min(currentGroup * 5, lastPage);

  // 이전 5개 페이지 그룹으로 이동
  const onClickPrevGroup = () => {
    const prevGroupEnd = groupStartPage - 1;
    if (prevGroupEnd > 0) {
      const newPage = Math.max(prevGroupEnd - 4, 1);
      onPageChange(newPage);
    }
  };

  // 다음 5개 페이지 그룹으로 이동
  const onClickNextGroup = () => {
    const nextGroupStart = groupEndPage + 1;
    if (nextGroupStart <= lastPage) {
      onPageChange(nextGroupStart);
    }
  };

  // 특정 페이지로 이동
  const onClickPage = (page: number) => {
    onPageChange(page);
  };

  // 현재 그룹의 페이지 번호 배열 생성 (최대 5개)
  const getPageNumbers = (): number[] => {
    const pageNumbers: number[] = [];
    for (let i = groupStartPage; i <= groupEndPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // 이전/다음 그룹 버튼 활성화 여부
  const hasPrevGroup = groupStartPage > 1;
  const hasNextGroup = groupEndPage < lastPage;

  return {
    onClickPrevGroup,
    onClickNextGroup,
    onClickPage,
    getPageNumbers,
    hasPrevGroup,
    hasNextGroup,
  };
}
