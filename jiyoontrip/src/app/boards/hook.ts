"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ChangeEvent, MouseEvent, useState } from "react";
import { Modal } from "antd";
import _ from "lodash";
// import { DELETE_BOARD, FETCH_BOARDS } from "./queires";
import {
  DeleteBoardDocument,
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/graphql/graphql";

export default function useBoardPage() {
  const router = useRouter();
  const { data, refetch } = useQuery(FetchBoardsDocument, { variables: { page: 1 } });
  const { data: dataBoardsCount } = useQuery(FetchBoardsCountDocument);
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10);
  const [deleteBoard] = useMutation(DeleteBoardDocument);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [startPage, setStartPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

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
    if (!deleteId) return; // 삭제할 ID 없으면 종료
    try {
      await deleteBoard({
        variables: { boardId: deleteId },
      });
      setIsModalOpen((prev) => !prev); // 모달 닫기
      setDeleteId(""); // 삭제 ID 초기화
      refetch({ page: startPage }); // 현재 페이지 새로고침
    } catch (error) {
      console.error("삭제 실패:", error);
    }
  };

  // const onClickDelete = async () => {
  //   await deleteBoard({
  //     variables: {
  //       boardId: deleteId,
  //     },
  //     refetchQueries: [{ query: FetchBoardsDocument }],
  //   });
  //   setIsModalOpen((prev) => !prev);
  // };

  const onClickPage = (event: MouseEvent<HTMLButtonElement>) => {
    setCurrentPage(Number(event?.currentTarget.id));
    refetch({ page: Number(event?.currentTarget.id) });
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
  const getDebounce = _.debounce((value) => {
    refetch({
      search: value,
      page: 1,
    });
    setKeyword(value);
  }, 500);

  const onChangeKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    getDebounce(event.target.value);
  };
  const onClickSubmit = () => {
    router.push("/boards/new");
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
    currentPage,
    onChangeKeyword,
    keyword,
    onClickSubmit,
  };
}
