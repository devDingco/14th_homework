'use client';
//수정페이지
import BoardsWrite from '@/components/boards-write';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id

      title
      contents
    }
  }
`;

export default function BoardsEdit() {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: params.boardId },
  });

  return (
    <div>
      <BoardsWrite isEdit={true} data={data} />
    </div>
  );
}
