import { gql } from '@apollo/client';

// 게시글 상세 정보를 가져오기 위한 GraphQL 쿼리
export const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id # 게시글 고유 ID
      writer # 작성자명
      title # 제목
      contents # 내용
      youtubeUrl # 유튜브 링크
      likeCount # 좋아요 수
      dislikeCount # 싫어요 수
      images # 첨부 이미지들
      createdAt # 생성일
      updatedAt # 수정일
      deletedAt # 삭제일
    }
  }
`;
