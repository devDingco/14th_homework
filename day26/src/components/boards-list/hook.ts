"use client";

import { useQuery, useMutation } from "@apollo/client";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import {
  // ❗️'목록'을 불러오는 올바른 Document 이름으로 변경했습니다.
  FetchBoardsDocument,
  DeleteBoardDocument,
} from "commons/graphql/graphql";

export const useBoardsList = () => {
  const [hoveredId, setHoveredId] = useState("");
  // ❗️'목록'을 불러오는 올바른 쿼리를 사용합니다. (boardId 필요 없음)
  const { data } = useQuery(FetchBoardsDocument);
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const router = useRouter();

  const onClickDelete = async (event: MouseEvent<HTMLSpanElement>, boardId: string) => {
    event.stopPropagation();
    try {
      await deleteBoard({
        variables: { boardId },
        refetchQueries: [{ query: FetchBoardsDocument }],
      });
      alert("삭제가 완료 되었습니다");
    } catch (error: any) {
      console.error("삭제 실패:", error.message);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const onClickDetail = (id: string) => {
    router.push(`/boards/${id}`);
  };

  return {
    data,
    hoveredId,
    setHoveredId,
    onClickDelete,
    onClickDetail,
  };
};