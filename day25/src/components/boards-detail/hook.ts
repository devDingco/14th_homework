// src/components/boards-detail/hook.ts

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
// 👇 'src/'를 삭제해서 경로를 수정합니다.
import { FetchBoardDocument } from "commons/graphql/graphql";
import { IBoardDetail } from "./types";

export const useBoardDetail = () => {
  const params = useParams();

  const { data, loading, error } = useQuery<{ fetchBoard: IBoardDetail }>(
    FetchBoardDocument,
    { variables: { boardId: String(params.boardId) } }
  );

  return {
    board: data?.fetchBoard,
    loading,
    error,
  };
};