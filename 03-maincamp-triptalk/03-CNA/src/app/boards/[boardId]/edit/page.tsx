"use client"

import BoardsComponentWrite from "@/components/boards-write"
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FetchBoardForEditDocument } from "@/commons/graphql/graphql"

export default function BoardsEditPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const { data } = useQuery(FetchBoardForEditDocument, {
    variables: { boardId },
    skip: !boardId,
  });
  
  return <BoardsComponentWrite isEdit={true} boardId={boardId} data={data}/>
}