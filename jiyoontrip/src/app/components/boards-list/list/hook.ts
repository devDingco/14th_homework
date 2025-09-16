"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { Modal } from "antd";
// import { DELETE_BOARD, FETCH_BOARDS } from "./queires";
import { DeleteBoardDocument, FetchBoardsDocument } from "@/commons/graphql/graphql";

export default function useBoardPage() {
  const router = useRouter();
  const { data } = useQuery(FetchBoardsDocument);
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const onClickDetail = (event: MouseEvent<HTMLElement>) => {
    router.push(`/boards/${event.currentTarget.id}`);
  };
  const onToggleDeletModal = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setDeleteId(String(event.currentTarget.id));
    setIsModalOpen(true);
  };
  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const onClickDelete = async () => {
    await deleteBoard({
      variables: {
        boardId: deleteId,
      },
      refetchQueries: [{ query: FetchBoardsDocument }],
    });
    setIsModalOpen((prev) => !prev);
  };

  return {
    onClickDelete,
    onClickDetail,
    onToggleModal,
    onToggleDeletModal,
    data,
    isModalOpen,
    Modal,
  };
}
