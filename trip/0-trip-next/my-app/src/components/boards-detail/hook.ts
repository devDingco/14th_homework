import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
// import { FETCH_BOARD_DETAIL } from "./queries";
import { IUseBoardsDetail } from "./types";
import { FetchBoardDetailDocument, FetchBoardDetailQuery, FetchBoardDetailQueryVariables } from "@/commons/gql/graphql";

export const useBoardsDetail = (): IUseBoardsDetail => {
    const router = useRouter();
    const params = useParams(); // { boardId: "..." }

    // boardId를 string으로 안전하게 변환
    const boardId = typeof params.boardId === "string" ? params.boardId : "";

    const { data } = useQuery<FetchBoardDetailQuery, FetchBoardDetailQueryVariables>(FetchBoardDetailDocument, {
      variables: { boardId },
      skip: !boardId, // boardId 없으면 쿼리 안날림
    });

    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}.${month}.${day}`;
      };

      const handleRouter = () => {
        const id = data?.fetchBoard?._id;
        if (!id) {
          alert("게시글 ID를 불러오지 못했습니다.");
          return;
        }
        router.push(`/boards/${id}/edit`);
      };

      return {
        data,
        formatDate,
        handleRouter,
      }
}