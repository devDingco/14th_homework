"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { LIKE_BOARD, DISLIKE_BOARD, FETCH_BOARD_DETAIL } from "./queries";
import type { BoardsDetailProps } from "./types";

export function useBoardsDetail(props: BoardsDetailProps) {
  const router = useRouter();
  const { data, loading, error } = useQuery(FETCH_BOARD_DETAIL, {
    variables: { boardId: props.boardId },
  });

  const [likeBoard] = useMutation(LIKE_BOARD);
  const [dislikeBoard] = useMutation(DISLIKE_BOARD);

  const onClickMoveToEdit = () => {
    router.push(`/boards/${props.boardId}/edit`);
  };

  const onClickMoveToList = () => {
    router.push(`/boards`);
  };

  const onClickLike = async () => {
    try {
      await likeBoard({ variables: { boardId: props.boardId }, refetchQueries: [{ query: FETCH_BOARD_DETAIL, variables: { boardId: props.boardId } }] });
    } catch (e) {
      console.error(e);
    }
  };

  const onClickDislike = async () => {
    try {
      await dislikeBoard({ variables: { boardId: props.boardId }, refetchQueries: [{ query: FETCH_BOARD_DETAIL, variables: { boardId: props.boardId } }] });
    } catch (e) {
      console.error(e);
    }
  };

  return {
    data,
    loading,
    error,
    onClickMoveToEdit,
    onClickMoveToList,
    onClickLike,
    onClickDislike,
  };
}


