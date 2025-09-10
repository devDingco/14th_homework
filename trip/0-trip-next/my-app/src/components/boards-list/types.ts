export interface IBoard {
    _id: string;
    writer: string;
    title: string;
    createdAt: string;
  }
  
  export interface FetchBoardsResponse {
    fetchBoards: IBoard[];
  }
  
  export interface IUseBoardList {
    data?: FetchBoardsResponse;
    onClickDelete: (id: string) => void;
    onClickRouter: (id: string) => void;
  }