"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
// import { FETCH_BOARD } from "../boards-write/queires";
import { FetchBoardDocument } from "@/commons/graphql/graphql";

export default function useDetailPage() {
  const params = useParams(); // 문자열로 나옴
  const router = useRouter();
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  const onClickMove = () => {
    router.push(`${data?.fetchBoard._id}/edit`);
  };
  return {
    onClickMove,
    data,
  };
}

// <FetchBoardsQuery, FetchBoardsQueryVariables>
