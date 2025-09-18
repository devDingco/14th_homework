import { FetchBoardQuery } from './gql/graphql';

export interface IBoardDetail {
  boardId: string | string[];
  data: FetchBoardQuery;
}
