"use client";
import BoardWrite from "@/components/boards-write";
import styles from "./styles.module.css";
import { useParams } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";

const FETCH_BOARD = gql`
  query fetchBoard($boardId: String) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoarEdit() {
  const address = useParams();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: address.boardId },
  });
  return <BoardWrite 수정_등록={true} data={data} />;
}
