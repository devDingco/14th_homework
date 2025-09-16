export interface ICommentWriteProps {
  boardId: string;
}

export interface ICreateBoardCommentInput {
  writer: string;
  password: string;
  contents: string;
  rating: number;
}
