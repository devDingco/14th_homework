export interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export interface PaginationHookResult {
  onClickPrevGroup: () => void;
  onClickNextGroup: () => void;
  onClickPage: (page: number) => void;
  getPageNumbers: () => number[];
  hasPrevGroup: boolean;
  hasNextGroup: boolean;
}
