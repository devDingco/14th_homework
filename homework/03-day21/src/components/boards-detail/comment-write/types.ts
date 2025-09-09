// 댓글 등록 Mutation Variables
export interface ICreateBoardCommentVariables {
    boardId: string;
    createBoardCommentInput: {
      writer: string;
      password: string;
      contents: string;
      rating?: number; // 선택적
    };
  }
  
  // 댓글 등록 Mutation Response
  export interface ICreateBoardComment {
    createBoardComment: {
      _id: string;
      writer: string;
      contents: string;
      rating: number;
      createdAt: string;
    };
  }