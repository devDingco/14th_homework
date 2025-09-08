export interface Board {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}

export interface FetchBoardsData {
  fetchBoards: Board[]; // Board 배열
}
