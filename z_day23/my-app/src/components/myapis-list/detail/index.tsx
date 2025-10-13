"use client";

import styles from "./styles.module.css";
import Link from "next/link";
import { IContentDetailProps } from "./types";
import { useContentDetail } from "./hooks";

export default function ContentDetail({ id }: IContentDetailProps) {
  const { board, loading, error, navigateToList } = useContentDetail(id);

  if (loading) {
    return <div className={styles.loading}>게시글을 불러오는 중입니다...</div>;
  }
  if (error) {
    return <div className={styles.error}>{error}</div>;
  }
  if (!board) {
    return <div className={styles.notFound}>게시글이 존재하지 않습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{board.title}</h1>
      <div className={styles.meta}>
        <span className={styles.writer}>작성자: {board.writer}</span>
        <span className={styles.date}>
          작성일: {new Date(board.created_at).toLocaleDateString()}
        </span>
      </div>
      <div className={styles.content}>{board.content}</div>
      <div className={styles.buttonGroup}>
        <Link href={`/myapis/${id}/edit`} className={styles.editButton}>
          수정하기
        </Link>
        <button onClick={navigateToList} className={styles.backButton}>
          목록으로
        </button>
      </div>
    </div>
  );
}
