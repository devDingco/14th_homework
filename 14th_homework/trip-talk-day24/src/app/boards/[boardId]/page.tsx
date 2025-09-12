"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

const FETCH_BORAD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;

const BoardDetail = () => {
  const router = useRouter();
  const my_address_variable = useParams();
  const { data } = useQuery(FETCH_BORAD, {
    variables: {
      boardId: my_address_variable.boardId,
    },
  });
  const onClickMove = () => {
    router.push(`/boards/${data?.fetchBoard._id}/edit`);
  };
  return (
    <>
      <div>작성자 : {data?.fetchBoard.writer}</div>
      <div>제목 : {data?.fetchBoard.title}</div>
      <div>내용 : {data?.fetchBoard.contents}</div>
      <button onClick={onClickMove}>수정하기</button>
    </>
  );
};

export default BoardDetail;
