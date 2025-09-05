'use client';
//수정페이지
import BoardsWrite from '@/components/boards-write';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
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

export default function BoardsEdit() {
  return (
    <div>
      <BoardsWrite isEdit={true} />
    </div>
  );
}
