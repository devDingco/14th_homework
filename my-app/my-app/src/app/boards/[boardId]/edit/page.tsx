"use client";

import { FetchBoardDocument } from "@/commons/gql/graphql";
import BoardsComponentWrite from "@/components/boards-write/index";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

export default function BoardsEdit() {
  const params = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: params.boardId,
    },
  });

  return <BoardsComponentWrite isEdit={true} />;
}
