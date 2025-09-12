import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  DeleteBoardDocument,
  FetchBoardsDocument,
  FetchBoardsQuery,
  FetchBoardsQueryVariables,
} from "@/commons/graphql/graphql";

export const useBoardList = () => {
  const { data, loading, error } = useQuery<
    FetchBoardsQuery,
    FetchBoardsQueryVariables
  >(FetchBoardsDocument);
  const router = useRouter();
  const [deleteBoard] = useMutation(DeleteBoardDocument);

  useEffect(() => {
    if (error) {
      console.error("게시글 불러오기 오류:", error);
    }
  }, [error]);

  const formatDate = (dateString: string): string => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const onClickDelete = async (boardIdToDelete: string) => {
    try {
      if (typeof window !== "undefined") {
        if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
      }
      const result = await deleteBoard({
        variables: {
          boardId: boardIdToDelete,
        },
        refetchQueries: [{ query: FetchBoardsDocument }],
      });
      if (typeof window !== "undefined") {
        window.alert(
          `게시글 (ID: ${result.data.deleteBoard})이 성공적으로 삭제되었습니다.`
        );
      }
    } catch (error) {
      if (typeof window !== "undefined") {
        // 오류가 Error 객체인지 확인
        if (error instanceof Error) {
          window.alert(`게시글 삭제에 실패했습니다: ${error.message}`);
        } else {
          window.alert("게시글 삭제에 실패했습니다.");
        }
      }
      console.error("게시글 삭제 오류:", error);
    }
  };

  const onClickTitle = (boardId: string) => {
    router.push(`/boards/${boardId}`);
  };

  return {
    data,
    onClickDelete,
    onClickTitle,
    formatDate,
    loading,
    error,
  };
};
