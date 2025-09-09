"use client"

import { useMutation, useQuery } from "@apollo/client";
// import { on } from 'events';
import { useRouter } from 'next/navigation';

import { DELETE_BOARD, FETCH_BOARDS } from "./queries";
import { MouseEvent } from "react";





export default function useBoardsList() {
  const router = useRouter();

    const onClickDelete = async (event:MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    alert("삭제가 완료되었습니다.")
    await deleteBoard({
      variables: {
        boardId: String(event.currentTarget.id),
        // html -> 화면에 그려짐 -> 이때는이미 "텍스트화되어잇음"-> 삭제클릭
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickMove = (boardId: string) => {
    
    router.push(`/boards/${boardId}`);
  }

  return{
    onClickMove,
    onClickDelete,
    data,
  }
}