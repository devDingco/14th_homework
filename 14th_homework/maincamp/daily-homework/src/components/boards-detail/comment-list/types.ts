import { BoardComment } from '@/commons/graphql/graphql';

export interface BoardCommentVariables {
  data?: BoardComment;
}

export type CommentErrors = {
  writer?: string;
  password?: string;
  contents?: string;
};
