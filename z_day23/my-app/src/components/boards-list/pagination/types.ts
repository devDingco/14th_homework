// components/boards-list/pagination/types.ts
export interface IPropsPagination {
  currentPage: number;
  lastPage: number;
  startPage: number;
  onClickPage: (page: number) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}
