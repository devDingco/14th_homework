"use client"

import BoardsComponentWrite from "@/components/boards-write"
import { useQuery, gql } from "@apollo/client";
import { useParams } from "next/navigation";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      writer
      title
      contents
    }
  }
`;

export default function BoardsEditPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId },
    skip: !boardId,
  });
  
  return <BoardsComponentWrite isEdit={true} boardId={boardId} data={data}/>
}