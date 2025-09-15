"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import useBoardsPage from "./hooks";
import { IFetchBoard } from "./queries";

export default function BoardsListPage() {
  const { onClickDeleteBoard, router, data } = useBoardsPage();

  const boards = data?.fetchBoards.map((el: IFetchBoard, index: number) => {
    const date = new Date(el.createdAt).toISOString().split("T")[0];
    return (
      <div
        id={el._id}
        className={styles.board}
        key={el._id}
        onClick={() => router.push(`../boards/${el._id}`)}
      >
        <div className={styles.listNumber}>{index}</div>
        <div className={styles.listTitle}>{el.title}</div>
        <div className={styles.listWriter}>{el.writer}</div>
        <div className={styles.listDate}>{date}</div>
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
    );
  });

  return (
    <div className={styles.listAll}>
      <div className={styles.listHeader}>
        <div className={styles.listNumber}>번호</div>
        <div className={styles.listTitle}>제목</div>
        <div className={styles.listWriter}>작성자</div>
        <div className={styles.listDate}>날짜</div>
      </div>
      {boards}
    </div>
  );
}
