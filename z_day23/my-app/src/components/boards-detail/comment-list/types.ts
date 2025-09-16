export interface IComment {
  _id: string;
  writer: string;
  contents: string;
  createdAt: string;
  rating: number;
}

export interface IFetchBoardCommentsResult {
  fetchBoardComments: IComment[];
}

export interface ICommentListProps {
  boardId: string;
}
