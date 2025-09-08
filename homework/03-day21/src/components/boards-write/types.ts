import { FetchBoardQuery } from "@/commons/graphql/graphql"

export interface IBoardWriteProps {
    data?: FetchBoardQuery
    isEdit: boolean
}

export interface IUpdateBoardInput {
    title?: string;
    contents?: string;
    youtubeUrl?: string;
    images?: string[];
  }
  
  export interface IMyvariables {
    updateBoardInput: IUpdateBoardInput;
    boardId: string;
    password: string;
  }

  export interface IUseBoardsWriteProps {
    isEdit: boolean;
    data?: FetchBoardQuery; // 선택적, 수정 페이지에서만 필요
  }