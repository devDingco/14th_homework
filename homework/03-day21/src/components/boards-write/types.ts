import { FetchBoardQuery } from "@/commons/graphql/graphql"

export interface IBoardWriteProps {
    data?: FetchBoardQuery
    isEdit: boolean
}

export interface IUpdateBoardInput {
    title?: string;
    contents?: string;
    boardAddress: {
      zipcode: string;
      address: string;
      addressDetail: string;
  }
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

export interface IDaumPostcodeData {
  zonecode: string;       // 우편번호
  address: string;        // 도로명 주소
  addressType?: string;
  bname?: string;
  buildingName?: string;
  sigunguCode?: string;
}