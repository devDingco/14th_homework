import { FetchBoardQuery } from '@/types/gql/graphql';

export interface IBoardDetail {
  boardId: string | string[];
  data: FetchBoardQuery;
}
