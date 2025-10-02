"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FetchBoardCommentsDocument } from "@/commons/graphql/graphql";

export const useCommentList = () => {
  const params = useParams();
  const id = Array.isArray(params.boardId) ? params.boardId[0] : params.boardId;


  const { data, loading } = useQuery(FetchBoardCommentsDocument, {
    variables: {
      boardId: id,
    },
    skip: !id,
  });

  
  return {
    data,
  };
};