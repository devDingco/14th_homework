import { FetchBoardQuery } from '@/commons/graphql/graphql';

export interface D_Variables {
  data?: FetchBoardQuery;
  isEdit: boolean;
  ID: string;
}
