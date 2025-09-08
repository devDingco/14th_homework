'use client'; // 이 컴포넌트를 클라이언트에서 실행하도록 설정
// 수정페이지 - 게시글을 수정하는 페이지 컴포넌트
import BoardsWrite from '@/components/boards-write'; // 게시글 작성/수정 공통 컴포넌트
import { gql, useQuery } from '@apollo/client'; // GraphQL 관련 라이브러리
import { useParams } from 'next/navigation'; // Next.js URL 파라미터 훅

// 수정할 게시글 정보를 가져오기 위한 GraphQL 쿼리
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id          # 게시글 고유 ID
      writer       # 작성자명
      title        # 제목
      contents     # 내용
      youtubeUrl   # 유튜브 링크
      likeCount    # 좋아요 수
      dislikeCount # 싫어요 수
      images       # 첨부 이미지들

      createdAt    # 생성일
      updatedAt    # 수정일
      deletedAt    # 삭제일
    }
  }
`;

// 게시글 수정 페이지 컴포넌트
export default function BoardsEdit() {
  const params = useParams(); // URL에서 boardId 파라미터 추출
  
  // GraphQL 쿼리를 사용해서 수정할 게시글 데이터 가져오기
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId }, // URL 파라미터로 받은 게시글 ID 전달
  });

  return (
    <div>
      {/* BoardsWrite 컴포넌트를 수정 모드로 사용 */}
      {/* isEdit={true}: 수정 모드 활성화 */}
      {/* data={data}: 기존 게시글 데이터 전달 */}
      <BoardsWrite isEdit={true} data={data} />
    </div>
  );
}
