"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { DELETE_BOARD, FETCH_BOARDS } from "./queires";

export default function useBoardPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await deleteBoard({
      variables: {
        boardId: String(event.currentTarget.id),
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
    alert("삭제ㅋ");
  };
  const onClickDetail = (event: MouseEvent<HTMLElement>) => {
    router.push(`/boards/${event.currentTarget.id}`);
  };
  return {
    onClickDelete,
    onClickDetail,
    data,
  };
}
