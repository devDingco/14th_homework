"use client";
import BoardWrite from "@/components/boards-write";
import styles from "./styles.module.css";
import { useParams } from "next/navigation";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";

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
  const { reset } = useForm();
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: address.boardId },
    onCompleted: (data) => {
      if (data?.fetchBoard) {
        reset({
          writer: data.fetchBoard.writer ?? "",
          title: data.fetchBoard.title ?? "",
          contents: data.fetchBoard.contents ?? "",
          zonecode: data.fetchBoard.boardAddress.zipcode ?? "",
          address: data.fetchBoard.boardAddress.address ?? "",
          address_detail: data.fetchBoard.addressDetail ?? "",
          youtubeUrl: data.fetchBoard.youtubeUrl ?? "",
        });
      }
    },
  });
  return (
    <div className="w-full max-w-3xl">
      <BoardWrite 수정_등록={true} data={data} />
    </div>
  );
}
