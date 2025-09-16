"use client";
import BoardWrite from "@/components/boards-write";
import styles from "./styles.module.css";
import { useParams } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
      boardAddress {
        zipcode
        address
        addressDetail
      }
      youtubeUrl
    }
  }
`;

export default function BoarEdit() {
  const address = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: address.boardId },
  });
  return (
    <div className="w-full max-w-3xl">
      <BoardWrite 수정_등록={true} data={data} />
    </div>
  );
}
