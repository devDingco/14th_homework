import { ChangeEvent, MouseEvent, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { Board } from '@/commons/graphql/graphql';
import { useRouter } from 'next/navigation';
import { DELETE_BOARD, FETCH_BOARDS, FETCH_BOARDS_COUNT } from './queries';

export default function useNewBoardsPage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  //   console.log(data?.fetchBoards[0]._id); // 잘 불러왔는지 확인
  const onClickDelete = async (boardId: string) => {
    await deleteBoard({
      variables: {
        boardId: boardId,
      },
      refetchQueries: [{ query: FETCH_BOARDS }, { query: FETCH_BOARDS_COUNT }],
    });
  };

  // 전체 게시글 수 조회
  const { data: TotalBoardsData } = useQuery(FETCH_BOARDS_COUNT);
  const number = TotalBoardsData?.fetchBoardsCount;

  // 페이지 이동
  const router = useRouter();

  return {
    data,
    deleteBoard,
    onClickDelete,
    TotalBoardsData,
    number,
    router,
  };
}
