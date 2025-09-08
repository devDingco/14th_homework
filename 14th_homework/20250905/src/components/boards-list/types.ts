export interface Board {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  likeCount: number;
  dislikeCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FetchBoardsData {
  fetchBoards: Board[];
}


