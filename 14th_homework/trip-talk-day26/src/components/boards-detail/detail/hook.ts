"use client";

import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BORAD } from "./queries";

const useBoardDetail = () => {
  const router = useRouter();
  const my_address_variable = useParams();
  const { data } = useQuery(FETCH_BORAD, {
    variables: {
      boardId: my_address_variable.boardId,
    },
  });
  const onClickMove = () => {
    router.push(`/boards/${data?.fetchBoard._id}/edit`);
  };
  return { onClickMove, data };
};

export default useBoardDetail;
