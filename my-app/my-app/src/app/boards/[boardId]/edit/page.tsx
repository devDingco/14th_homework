"use client";

import BoardsComponentWrite from "@/components/boards-write/index";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      # password
      title
      contents
      createdAt
    }
  }
`;

export default function BoardsEdit() {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: params.boardId,
    },
  });

  return <BoardsComponentWrite isEdit={true} />;
}
