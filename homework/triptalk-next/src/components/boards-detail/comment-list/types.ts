import { MouseEvent } from 'react';

export interface Comment {
  _id: string;
  writer: string;
  contents: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface FetchBoardCommentsData {
  fetchBoardComments: Comment[];
}

export interface UseCommentListParams {
  boardId: string;
}

export interface UseCommentListReturn {
  data: FetchBoardCommentsData | undefined;
  onClickDeleteComment: (event: MouseEvent<HTMLButtonElement>) => Promise<void>;
}