"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import useBoardPage from "./hook";

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

export default function BoardsPageComponent() {
  const { onClickDelete, onClickDetail, data } = useBoardPage();
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
