"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { BoardsListProps } from "./types";

export default function BoardsList({ boards, onClickDelete, onClickNew, onClickRow }: BoardsListProps) {
  if (!boards || boards.length === 0) {
    return <div className="text-center mt-20">게시글이 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>게시글 목록</h1>
          <button onClick={onClickNew} className={styles.newButton}>
            게시글 등록
          </button>
        </div>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.tr}>
                <th className={styles.th}>번호</th>
                <th className={styles.th}>제목</th>
                <th className={styles.th}>작성자</th>
                <th className={styles.th}>날짜</th>
                <th className={styles.th}></th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {boards.map((board, index) => (
                <tr key={board._id} className={styles.tr} onClick={() => onClickRow(board._id)}>
                  <td className={styles.td}>{index + 1}</td>
                  <td className={styles.td}>{board.title}</td>
                  <td className={`${styles.td} ${styles.tdMuted}`}>{board.writer}</td>
                  <td className={`${styles.td} ${styles.tdMuted}`}>
                    {new Date(board.createdAt).toLocaleDateString("ko-KR")}
                  </td>
                  <td className={`${styles.td} ${styles.deleteCell}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickDelete(board._id);
                      }}
                      className={styles.deleteButton}
                    >
                      <Image src="/images/delete.png" alt="삭제" width={20} height={20} className={styles.deleteIcon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
