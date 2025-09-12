import { QueryFetchBoardCommentsArgs } from '@/commons/graphql/graphql';

export interface CommentVariables {
  data?: QueryFetchBoardCommentsArgs;
  //   isComment: boolean;
}

export type Errors = {
  writer?: string;
  password?: string;
  contents?: string;
};
