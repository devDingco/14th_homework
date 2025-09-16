"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
// import { FETCH_BOARD } from "../boards-write/queires";
import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { useState } from "react";

export default function useDetailPage() {
  const params = useParams(); // 문자열로 나옴
  const router = useRouter();
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });

  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);

  const onClickMove = () => {
    router.push(`${data?.fetchBoard._id}/edit`);
  };
  const onClickLikeCount = () => {
    setLikeCount(likeCount + 1);
  };
  const onClickDislikeCount = () => {
    setDisLikeCount(disLikeCount + 1);
  };

  return {
    onClickMove,
    onClickLikeCount,
    onClickDislikeCount,
    data,
  };
}

// <FetchBoardsQuery, FetchBoardsQueryVariables>
