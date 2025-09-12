"use client";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
interface IFetchBoard {
  _id: string;
  title: string;
  writer: string;
  createdAt: string;
}
const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      title
      writer
      createdAt
    }
  }
`;
const DELETE_BOARD = gql`
  mutation deleteBoard($boardId_: ID!) {
    deleteBoard(boardId: $boardId_)
  }
`;
export default function BoardsPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);
  const onClickDeleteBoard = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await deleteBoard({
      variables: {
        boardId_: (event.currentTarget as HTMLButtonElement).id,
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
  };
  const boards = data?.fetchBoards.map((el: IFetchBoard, index: number) => (
    <div
      id={el._id}
      className={styles.board}
      key={el._id}
      onClick={() => router.push(`../boards/${el._id}`)}
    >
      <span>{index}</span>
      <span>{el.title}</span>
      <span>{el.writer}</span>
      <span>{el.createdAt}</span>
      <Image
        id={el._id}
        className={styles.delete_icon}
        src="/images/Vector.png"
        alt="arrow icon"
        width={15}
        height={17}
        onClick={onClickDeleteBoard}
      />
    </div>
  ));

  return (
    <div>
      <div>
        <span>번호</span>
        <span>제목</span>
        <span>작성자</span>
        <span>날짜</span>
      </div>
      {boards}
    </div>
  );
}
