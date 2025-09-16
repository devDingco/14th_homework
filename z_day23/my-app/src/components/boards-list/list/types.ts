// components/boards-list/list/types.ts
export interface IBoard {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}

export interface IQuery {
  fetchBoards: IBoard[];
  fetchBoardsCount: number;
}
