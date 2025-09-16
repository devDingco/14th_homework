"use client";

import { FetchBoardCommentsDocument } from "@/commons/gql/graphql";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export const useCommentList = () => {
  const params = useParams();
  const { data } = useQuery(FetchBoardCommentsDocument, {
    variables: { boardId: String(params.boardId) },
  });
  console.log(data);

  return {
    data,
  };
};
