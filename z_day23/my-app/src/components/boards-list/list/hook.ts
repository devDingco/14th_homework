// components/boards-list/list/hook.ts
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT, DELETE_BOARD } from "./queries";
import { IBoard, IQuery } from "./types";

export const useBoardList = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  // 게시글 목록을 불러오는 쿼리
  const { data, loading, error, refetch } = useQuery<IQuery>(FETCH_BOARDS, {
    variables: { page: 1 },
  });

  // 게시글 총 개수를 불러오는 쿼리
  const { data: dataBoardsCount } = useQuery(FETCH_BOARDS_COUNT);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

  // 게시글 삭제 뮤테이션
  const [deleteBoard] = useMutation(DELETE_BOARD);

  // 게시글 삭제 함수
  const onClickDelete = async (boardIdToDelete: string) => {
    try {
      if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
      await deleteBoard({
        variables: { boardId: boardIdToDelete },
        refetchQueries: [
          { query: FETCH_BOARDS, variables: { page: currentPage } },
          { query: FETCH_BOARDS_COUNT },
        ],
      });
      window.alert("게시글이 성공적으로 삭제되었습니다.");
    } catch (err) {
      const error = err as Error;
      window.alert(`게시글 삭제에 실패했습니다: ${error.message}`);
      console.error("게시글 삭제 오류:", error);
    }
  };

  // 제목 클릭 시 상세 페이지로 이동
  const onClickTitle = (boardId: string) => {
    router.push(`/boards/${boardId}`);
  };

  // 날짜 형식 변환
  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return {
    data,
    loading,
    error,
    onClickTitle,
    onClickDelete,
    formatDate,
    refetch,
    currentPage,
    setCurrentPage,
    lastPage,
  };
};
