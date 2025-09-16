"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD } from "./queries";
import { useState } from "react";

const useBoardDetail = () => {
  const router = useRouter();
  const [likes, setLikes] = useState<number>(0);
  const [dislikes, setDislikes] = useState<number>(0);
  const my_address_variable = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: my_address_variable.boardId,
    },
  });
  const onClickMove = () => {
    router.push(`/boards/${data?.fetchBoard._id}/edit`);
  };

  const handleLike = () => {
    setLikes(likes + 1);
  };
  const handleDislike = () => {
    setDislikes(dislikes + 1);
  };
  return { onClickMove, handleLike, handleDislike, likes, dislikes, data };
};

export default useBoardDetail;
