"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { Modal } from "antd";
// import { DELETE_BOARD, FETCH_BOARDS } from "./queires";
import { DeleteBoardDocument, FetchBoardsDocument } from "@/commons/graphql/graphql";
import { FERTCH_BOARDS_COUNT, FETCH_BOARDS } from "./queires";

export default function useBoardPage() {
  const router = useRouter();
  const { data } = useQuery(FetchBoardsDocument);
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const { refetch } = useQuery(FETCH_BOARDS);
  const { data: dataBoardsCount } = useQuery(FERTCH_BOARDS_COUNT);
  const [startPage, setStartPage] = useState(1);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);

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

  const onClickPage = (event) => {
    refetch({ page: Number(event?.target.id) });
  };
  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    refetch({ page: startPage - 10 });
  };
  const onClickNextPage = () => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      refetch({ page: startPage + 10 });
    }
  };
  return {
    onClickDelete,
    onClickDetail,
    onToggleModal,
    onToggleDeletModal,
    data,
    isModalOpen,
    Modal,
    onClickNextPage,
    onClickPrevPage,
    onClickPage,
    lastPage,
    startPage,
  };
}
