"use client";

import React from "react";
// import Link from "next/link";
import Image from "next/image";
import { useBoardsList } from "./hook";
import type { FetchBoardsQuery } from "@/commons/graphql/graphql";
import styles from "./styles.module.css";

export default function BoardsList() {
  const { data, loading, error, onClickDelete, onClickNew, onClickRow } = useBoardsList();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="mt-4 text-gray-500">로딩 중입니다...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-bold">게시글을 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  const boards = (data as FetchBoardsQuery | undefined)?.fetchBoards ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>게시글 목록</h1>
          <button onClick={onClickNew} className={styles.newButton}>게시글 등록</button>
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
              {boards.length > 0 ? (
                boards.map((board, index) => (
                  <tr key={board._id} className={styles.tr} onClick={() => onClickRow(board._id)}>
                    <td className={styles.td}>{boards.length - index}</td>
                    <td className={styles.td}>
                      {board.title}
                    </td>
                    <td className={`${styles.td} ${styles.tdMuted}`}>{board.writer}</td>
                    <td className={`${styles.td} ${styles.tdMuted}`}>{new Date(board.createdAt).toLocaleDateString("ko-KR")}</td>
                    <td className={`${styles.td} ${styles.deleteCell}`}>
                      <button onClick={(e) => { e.stopPropagation(); onClickDelete(board._id); }} className={styles.deleteButton}>
                        <Image src="/images/delete.png" alt="삭제" width={20} height={20} className={styles.deleteIcon} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className={styles.tr}>
                  <td colSpan={5} className={styles.td}>게시글이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


