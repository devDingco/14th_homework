export interface PaginationProps {
  totalPages: number;
  initialPage: number;
  onChange?: (page: number) => void;
}

export interface BoardItem {
  id: number | string;
  title: string;
  author: string;
  date: string;
  [key: string]: any; 
}

export interface MenuTab {
  id: string;
  label: string;
  data: BoardItem[];
}

export interface BoardListProps extends PaginationProps {
  title?: string;
  data?: BoardItem[];
  menuTabs?: MenuTab[];
  defaultTabId?: string;
  filtersEnabled?: boolean;
  postButtonLabel?: string;
  onTabChange?: (tabId: string) => void;
}
