import { FetchBoardQuery } from '@/commons/graphql/graphql';

export interface IBoardsDetailProps {
  data?: FetchBoardQuery;
}
export interface Board {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}
