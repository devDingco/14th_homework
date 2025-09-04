// MyPage 관련 타입 정의

// 메뉴 관련 타입
export type MenuId = 'history&bookmark' | 'point' | 'password';

export interface MyMenuProps {
  activeMenu: MenuId;
  onMenuChange: (menuId: MenuId) => void;
}

export interface MenuConfig {
  id: MenuId;
  label: string;
}

// 상품 데이터 관련 타입
export interface ProductData {
  id: number;
  name: string;
  price: number;
  date: string;
  status?: string | null;
  seller?: string;
}

export type ProductTabType = 'my' | 'bookmark';

// 포인트 데이터 관련 타입
export type PointTransactionType = '충전' | '구매' | '사용' | '환불';

export interface PointData {
  id: number;
  date: string;
  type: PointTransactionType;
  amount: number;
  balance: number;
}

export type PointTabType = 'all' | 'charge' | 'purchase' | 'sale';

// 테이블 공통 타입
export interface PaginationResult<T> {
  totalPages: number;
  startIndex: number;
  paginatedData: T[];
}

// 거래 데이터 (mock 데이터용)
export interface TransactionData {
  id: number;
  date: string;
  type: string;
  product: string;
  amount: number;
  balance: number;
  seller: string | null;
}
