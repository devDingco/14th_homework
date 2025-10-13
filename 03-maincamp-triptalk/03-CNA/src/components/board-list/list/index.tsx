"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import { formatDate } from "@/utils/formatDate";
import deleteIcon from "@/assets/icons/delete.png";
import React from "react";
import useBoardList from "@/components/board-list/list/hook";
import { useRouter } from "next/navigation";

export default function BoardList() {
  const router = useRouter();
  const { data, deleteBoard, onClickDelete } = useBoardList();

  return (
    <div className={styles.container}>
      <section className={styles.card}>
        <div className={styles.header}>
          <div className={styles.noCol}>번호</div>
          <div className={styles.titleCol}>제목</div>
          <div className={styles.authorCol}>작성자</div>
          <div className={styles.dateCol}>날짜</div>
          <div className={styles.actionsCol}></div>
        </div>

        <ul className={styles.list} role="list">
          {data?.fetchBoards.map((board, index) => (
            <li
              key={board._id}
              className={styles.row}
              onClick={() => router.push(`/boards/${board._id}`)}
            >
              <div className={styles.noCol}>{index + 1}</div>
              <Link href={`/boards/${board._id}`} className={styles.titleLink}>
                <span className={styles.titleText}>{board.title}</span>
              </Link>
              <div className={styles.authorCol}>
                <span className={styles.chip}>{board.writer}</span>
              </div>
              <div className={styles.dateCol}>
                <span className={styles.badge}>
                  {formatDate(board.createdAt)}
                </span>
              </div>
              <div className={styles.actionsCol}>
                <button
                  className={styles.deleteIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickDelete(e, board._id);
                  }}
                  aria-label="삭제"
                  title="삭제"
                >
                  <img src={deleteIcon.src} alt="삭제" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
