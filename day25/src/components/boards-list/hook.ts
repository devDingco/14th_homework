// src/components/boards-list/hook.ts

import { useQuery, useMutation } from "@apollo/client";
import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
// ❗️[수정] 경로에서 'src/' 제거 및 정확한 Document 이름으로 변경
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
      cosnt response = await deleteBoard({
        variables: { boardId: hoveredId },
        refetchQueries: [{ query: FetchBoardForDetailDocument }],
      });
    } if (response.data) {
      alert("삭제가 완료 되었습니다");
    } else {
      alert("삭제가 실패하였습니다.");
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
    deleteBoard,
    onClickDelete,
    onClickDetail,
  };
};