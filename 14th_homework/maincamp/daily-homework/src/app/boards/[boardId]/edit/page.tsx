'use client';

import BoardsWriteAdvanced from '@/commons/components/boards-write';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

const FETCH_BOARD = gql`
  query fetchBoard($ID: ID!) {
    fetchBoard(boardId: $ID) {
      writer
      title
      contents
      createdAt
      updatedAt
    }
  }
`;
export default function BoardComponentEditPage() {
  const myUrl = useParams();
  // console.log(myUrl.boardId);

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      ID: String(myUrl.boardId),
    },
  });
  // console.log(data);

  return <BoardsWriteAdvanced isEdit={true} data={data} />;
}
