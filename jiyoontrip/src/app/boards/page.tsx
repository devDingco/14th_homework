"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
const FETCH_BOARDS = gql`
  query {
    fetchBoards {
      _id
      writer
      title
      contents
      youtubeUrl
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

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

interface IFetchBoard {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  youtubeUrl: string;
  likeCount: number;
  dislikeCount: number;
  images: string[];
  boardAddress: {
    _id: string;
    zipcode: string;
    address: string;
    addressDetail: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function BoardsPage() {
  const router = useRouter();
  const { data } = useQuery(FETCH_BOARDS);
  console.log(data?.fetchBoards);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await deleteBoard({
      variables: {
        boardId: String(event.currentTarget.id),
      },
      refetchQueries: [{ query: FETCH_BOARDS }],
    });
    alert("삭제ㅋ");
  };
  const onClickDetail = (event: MouseEvent<HTMLElement>) => {
    router.push(`/boards/${event.currentTarget.id}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.boardHeader}>
          <span className={styles.boardHeader__number}>번호</span>
          <span className={styles.boardHeader__title}>제목</span>
          <span className={styles.boardHeader__writer}>작성자</span>
          <span className={styles.boardHeader__date}>날짜</span>
          <span className={styles.boardHeader__delete}></span>
        </div>
        <div className={styles.boardList}>
          {data?.fetchBoards.map((el: IFetchBoard, index: number) => {
            return (
              <div key={el._id} className={styles.boardList__item}>
                <span className={styles.boardList__item__number}>{index + 1}</span>
                <span
                  className={styles.boardList__item__title}
                  id={el._id}
                  onClick={onClickDetail}
                >
                  {el.title}
                </span>
                <span className={styles.boardList__item__writer}>{el.writer}</span>
                <span className={styles.boardList__item__date}>
                  {el.createdAt.split("T")[0]}
                </span>
                <button
                  id={el._id}
                  onClick={onClickDelete}
                  className={styles.boardList__item__delete}
                >
                  <Image
                    src="/icons/outline/delete.svg"
                    alt="ProfileIcon"
                    width={24}
                    height={24}
                    sizes="100vw"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
