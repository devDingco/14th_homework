"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FetchBoardDetailDocument } from "@/commons/graphql/graphql";

export function useBoardsDetail() {
  const router = useRouter();
  const { boardId } = useParams<{ boardId: string }>();

  const { data } = useQuery(FetchBoardDetailDocument, {
    variables: { boardId },
    skip: !boardId,
  });

  const board = data?.fetchBoard;

  const goList = () => router.push("/boards");
  const goEdit = () => router.push(`/boards/${boardId}/edit`);

  return { data, goList, goEdit, board };
}
