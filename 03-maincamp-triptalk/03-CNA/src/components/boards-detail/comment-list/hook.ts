"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_BOARD_COMMENTS } from "./queries";

export default function useCommentList() {
  const { boardId } = useParams<{ boardId: string }>();

  const { data, loading, error, refetch } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId },
    skip: !boardId,
  });

  const comments = data?.fetchBoardComments ?? [];

  return { comments, loading, error, refetch };
}


