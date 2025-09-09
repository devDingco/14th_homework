import { FetchBoardsQuery } from '@/commons/graphql/graphql';

export interface IBoardsListProps {
  data?: FetchBoardsQuery; // ← 자동생성된 타입 사용
}
export interface Board {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}
