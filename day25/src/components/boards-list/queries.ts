import { gql } from "@apollo/client";

// [요청서 1] 게시글 목록 조회 (Query) 상세보기용 fetchBoard러
export const FETCH_BOARDS = gql`
  query FetchBoardForDetail($boardId: ID!){
    fetchBoards($boardId: ID!) {
      _id
      writer
      title
      contents
      youtubeUrl
      likeCount
      dislikeCount
      images
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

// [요청서 2] 게시글 삭제 (Mutation)
 // 이거 왜 
export const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

//queries.ts (API 요청서를 보관할 레시피 북)cv