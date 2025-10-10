
export interface Board {
    _id: string;
    writer: string;
    title: string;
    contents: string;
  }
  
export interface FetchBoardsData {
    fetchBoards: Board[];
  }
  