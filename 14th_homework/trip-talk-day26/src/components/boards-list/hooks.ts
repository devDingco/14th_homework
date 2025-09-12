"use client";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { FETCH_BOARDS, DELETE_BOARD } from "./queries";

export default function useBoardsPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const onClickDeleteBoard = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await deleteBoard({
      variables: {
        boardId_: (event.currentTarget as HTMLButtonElement).id,
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };

  return { onClickDeleteBoard, router, data };
}
