export interface IBoardWriteProps {
  isEdit: boolean
  boardData?: MyBoardRow; // 수정용 데이터
    // data?: {
    //     fetchBoard?: {
    //         _id?: string
    //         title?: string
    //         contents?: string
    //         boardAddress?: {
    //             zipcode?: string
    //             address?: string
    //             addressDetail?: string
    //         }
    //         images?: string[]
    //         createdAt?: string
    //     }
    // }
}

export interface IUpdateBoardInput {
    title?: string;
    contents?: string;
    boardAddress: {
      zipcode: string;
      address: string;
      address_Detail: string;
  }
    images?: string[];
  }
  
export interface IMyvariables {
  updateBoardInput: IUpdateBoardInput;
  boardId: string;
}

export interface IUseBoardsWriteProps {
  isEdit: boolean;
  boardId?: string; // 추가
  boardData?: MyBoardRow; // 수정 페이지에서만 필요

  // data?: {
  //   fetchBoard?: {
  //     _id?: string
  //     title?: string
  //     contents?: string
  //     boardAddress?: {
  //       zipcode?: string
  //       address?: string
  //       addressDetail?: string
  //     }
  //     images?: string[]
  //     createdAt?: string
  //   }
  // }; // 선택적, 수정 페이지에서만 필요
}

export interface IDaumPostcodeData {
  zonecode: string;       // 우편번호
  address: string;        // 도로명 주소
  addressType?: string;
  bname?: string;
  buildingName?: string;
  sigunguCode?: string;
}

// Supabase myboard 테이블 Row 타입 (공용 사용)
export type MyBoardRow = {
  id: string
  title: string
  contents: string
  images: string | null
  address: string | null
  zipcode?: string | null
  address_detail?: string | null
  created_at?: string
}