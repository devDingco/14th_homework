"use client";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import { FETCH_BOARDS, DELETE_BOARD } from "./queries";

export default function useBoardsPage(queryVariables: {
  search: string;
  page: number;
  endDate?: string;
  startDate?: string;
}) {
  const router = useRouter();
  const [deleteBoard] = useMutation(DELETE_BOARD);
  // const [page, setPage] = useState(1);

  // const { data, refetch, variables } = useQuery(FETCH_BOARDS, {
  //   variables: { page },
  //   fetchPolicy: "network-only", // ✅ 캐시 무시하고 서버 데이터 우선
  // });

  const onClickDeleteBoard = async (event: MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인 후 이용 가능합니다.");
      router.push("/");
      return;
    }
    try {
      await deleteBoard({
        variables: {
          boardId_: event.currentTarget.id,
        },
        // refetchQueries 대신 현재 쿼리 변수로 다시 조회
        refetchQueries: [{ query: FETCH_BOARDS, variables: queryVariables }],
      });
      console.log("삭제완료");
      // await refetch();
      console.log("리페치완료");
    } catch (error) {
      console.error(error);
      alert("게시글 삭제 중 오류가 발생했습니다.");
    }
  };
  return { onClickDeleteBoard, router };
}
