import { QueryFetchBoardCommentsArgs, BoardComment } from '@/commons/graphql/graphql';

export interface CommentVariables {
  data?: QueryFetchBoardCommentsArgs;
  isEdit?: boolean;
  editData?: BoardComment;
  onCancel?: () => void;
  onSave?: () => void;
}

export type Errors = {
  writer?: string;
  password?: string;
  contents?: string;
};
