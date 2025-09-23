import { useState } from "react";
import { IPaginationProps } from "./types";

import { useQuery } from "@apollo/client";

import {
  FetchBoardsCountDocument,
  FetchBoardsDocument,
} from "@/commons/gql/graphql";

export const usePagination = (props: IPaginationProps) => {
  const [startPage, setStartPage] = useState(1);

  const onClickPage = (event: any) => {
    props.refetch({ page: Number(event.target.id) });
  };

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    setStartPage(startPage - 5);
    props.refetch({ page: startPage - 5 });
  };

  const onClickNextPage = () => {
    if (startPage + 5 <= props.lastPage) {
      setStartPage(startPage + 5);
      props.refetch({ page: startPage + 5 });
    }
    // "if (startPage + 10 <= lastPage)" ->  마지막 페이지 번호(lastPage)를 넘어가지 않게 막아둔 거!
  };

  return {
    startPage,
    onClickPage,
    onClickPrevPage,
    onClickNextPage,
  };
};

// const [modalContent, setModalContent] = useState("");
// const [isModalOpen, setIsModalOpen] = useState(false);

// const showModal = () => {
//   setIsModalOpen(true);
// };

// const handleOk = () => {
//   setIsModalOpen(false);
// };

// const handleCancel = () => {
//   setIsModalOpen(false);
// };

//
// , {
// variables: {
//   page: params?.page ? parseInt(String(params.page), 10) : 1,
// useParams()가 반환하는 값은 문자열인데, $page는 Int임.
// -> 문자열을 정수로 변환해야 함!
// + 라우트가 /boards/[page] 형태가 아니라면 params.page 자체가 없을 수도 있기때문에 기본값(예: 1)을 두는 게 안전함
// params.page가 있다면 params.page를 숫자로 변환해서 쓰고, 없다면 자동으로 page=1
