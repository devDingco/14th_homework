export interface PaginationProps {
  totalPages: number;
  initialPage: number;
  onChange?: (page: number) => void;
}

export interface BoardListProps extends PaginationProps {}
