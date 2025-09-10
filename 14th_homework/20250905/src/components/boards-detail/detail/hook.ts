"use client";

import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { FetchBoardDetailDocument } from "@/commons/graphql/graphql";
import type { BoardsDetailProps } from "./types";

export function useBoardsDetail(props: BoardsDetailProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery(FetchBoardDetailDocument, {
    variables: { boardId: props.boardId },
  });

  const onClickMoveToEdit = () => {
    router.push(`/boards/${props.boardId}/edit`);
  };

  const onClickMoveToList = () => {
    router.push(`/boards`);
  };

  return {
    data,
    loading,
    error,
    onClickMoveToEdit,
    onClickMoveToList,
  };
}


