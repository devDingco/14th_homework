import { ChangeEvent, MouseEvent, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { Board } from '@/commons/graphql/graphql';
import { useRouter } from 'next/navigation';
import { DELETE_BOARD, FETCH_BOARDS, FETCH_BOARDS_COUNT } from './queries';

export default function useNewBoardsPage(refetch: any) {
  const [deleteBoard] = useMutation(DELETE_BOARD);

  //   console.log(data?.fetchBoards[0]._id); // 잘 불러왔는지 확인
  const onClickDelete = async (boardId: string) => {
    await deleteBoard({
      variables: {
        boardId: boardId,
      },
      refetchQueries: [{ query: FETCH_BOARDS }, { query: FETCH_BOARDS_COUNT }],
    });

    // 상위 컴포넌트의 refetch 호출
    if (refetch) {
      refetch();
    }
  };

  // 페이지 이동
  const router = useRouter();

  return {
    deleteBoard,
    onClickDelete,
    router,
  };
}
