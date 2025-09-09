"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { DeleteBoardDocument, FetchBoardsDocument } from "@/commons/graphql/graphql";
import type { FetchBoardsData } from "./types";

export function useBoardsList() {
  const router = useRouter();
  const { data, loading, error } = useQuery(FetchBoardsDocument);
  const [deleteBoard] = useMutation(DeleteBoardDocument, { refetchQueries: [{ query: FetchBoardsDocument }] });

  const onClickDelete = async (boardId: string) => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deleteBoard({ variables: { boardId } });
      } catch (mutationError) {
        console.error("게시글 삭제 중 오류 발생:", mutationError);
      }
    }
  };

  const onClickNew = () => router.push("/boards/new");

  return { data, loading, error, onClickDelete, onClickNew };
}


