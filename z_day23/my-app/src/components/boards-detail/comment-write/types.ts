export interface IComment {
  _id: string;
  writer: string;
  contents: string;
  rating: number;
  createdAt: string;
}

export interface ICommentWriteProps {
  boardId: string;
  isEdit?: boolean;
  comment?: IComment;
  onEditComplete?: () => void;
}

export interface ICreateBoardCommentInput {
  writer: string;
  password: string;
  contents: string;
  rating: number;
}
