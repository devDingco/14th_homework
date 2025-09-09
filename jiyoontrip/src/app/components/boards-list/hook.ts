"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
// import { DELETE_BOARD, FETCH_BOARDS } from "./queires";
import { DeleteBoardDocument, FetchBoardsDocument } from "@/commons/graphql/graphql";

export default function useBoardPage() {
  const router = useRouter();
  const { data } = useQuery(FetchBoardsDocument);
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await deleteBoard({
      variables: {
        boardId: String(event.currentTarget.id),
      },
      refetchQueries: [{ query: FetchBoardsDocument }],
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
