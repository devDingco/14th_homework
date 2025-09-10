'use client';

import BoardsWriteAdvanced from '@/components/boards-write';
import { FETCH_BOARD } from '@/components/boards-write/queries';
import { useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';

export default function BoardComponentEditPage() {
  const myUrl = useParams();

  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: String(myUrl.boardId),
    },
  });
  // console.log(data);

  return <BoardsWriteAdvanced isEdit={true} data={data} />;
}

// import BoardsWriteAdvanced from '@/commons/components/boards-write';
// import { gql, useQuery } from '@apollo/client';
// import { useParams } from 'next/navigation';

// const FETCH_BOARD = gql`
//   query fetchBoard($boardId: ID!) {
//     fetchBoard(boardId: $boardId) {
//       _id
//       writer
//       title
//       contents
//       createdAt
//       updatedAt
//     }
//   }
// `;

// export default function BoardComponentEditPage() {
//   const myUrl = useParams();
//   // console.log(myUrl.boardId);

//   const { data } = useQuery(FETCH_BOARD, {
//     variables: {
//       boardId: String(myUrl.boardId),
//     },
//   });
//   // console.log(data);

//   return <BoardsWriteAdvanced isEdit={true} data={data} />;
// }
