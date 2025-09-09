"use client";

import BoardWrite from "@/app/components/boards-write";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      likeCount
      dislikeCount
      images
      boardAddress {
        _id
        zipcode
        address
        addressDetail
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export default function EditPage() {
  const params = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: String(params.boardId),
    },
  });
  return <BoardWrite isEdit={true} data={data} />;
}
