// 댓글 목록 조회 Query Variables
export interface IFetchBoardCommentsVariables {
    boardId: string;
  }
  
  // 댓글 목록 조회 Query Response
  export interface IFetchBoardComments {
    fetchBoardComments: {
      _id: string;
      writer: string;
      contents: string;
      rating: number;
      createdAt: string;
    }[];
  }