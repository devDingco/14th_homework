// src/components/boards-list/hook.ts

import { useQuery, useMutation } from "@apollo/client";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import {
  // 👇 실제 생성된 이름으로 수정합니다.
  FetchBoardForDetailDocument,
  DeleteBoardDocument,
} from "commons/graphql/graphql";

export const useBoardsList = () => {
  const [hoveredId, setHoveredId] = useState("");
  // 👇 실제 생성된 이름으로 수정합니다.
  const { data } = useQuery(FetchBoardForDetailDocument);
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const router = useRouter();

  const onClickDelete = async (event: MouseEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    try {
      await deleteBoard({
        variables: { boardId: hoveredId },
        // 👇 refetchQuery에도 실제 생성된 이름으로 수정합니다.
        refetchQueries: [{ query: FetchBoardForDetailDocument }],
      });
    } catch (error: any) {
      console.error("삭제실패:", error.message);
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