"use client";
import Image from "next/image";
import styles from "./styles.module.css";
import useBoardsPage from "./hooks";
import { IFetchBoard } from "./queries";
import { useState } from "react";
import SearchBar from "../search";

export default function BoardsListPage(props) {
  const { onClickDeleteBoard, router } = useBoardsPage();
  const boards = props.data?.map((el: IFetchBoard, index: number) => {
    const date = new Date(el.createdAt).toISOString().split("T")[0];
    return (
      <div
        id={el._id}
        className={styles.board}
        key={el._id}
        onClick={() => router.push(`../boards/${el._id}`)}
      >
        <div className={styles.listNumber}>{index}</div>
        <div className={styles.listTitle}>
          {el.title
            .replaceAll(props.keyword, `!@#${props.keyword}!@#`)
            .split("!@#")
            .map((el, index) => (
              <span
                key={`${el}_${index}`}
                style={{ color: el === props.keyword ? "red" : "black" }}
              >
                {el}
              </span>
            ))}
        </div>
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
    <>
      <div className={styles.listAll}>
        <div className={styles.listHeader}>
          <div className={styles.listNumber}>번호</div>
          <div className={styles.listTitle}>제목</div>
          <div className={styles.listWriter}>작성자</div>
          <div className={styles.listDate}>날짜</div>
        </div>
        {boards}
      </div>
    </>
  );
}
