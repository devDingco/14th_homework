"use client";

import Image from "next/image";
import React from "react";
import { useBoardsDetail } from "./hook";
import type { BoardsDetailProps } from "./types";
import styles from "./styles.module.css";

export default function BoardsDetail(props: BoardsDetailProps) {
  const { data, loading, error, onClickMoveToEdit, onClickMoveToList } = useBoardsDetail(props);

  if (loading) {
    return <div className="text-center mt-20">로딩 중입니다...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">에러 발생: {error.message}</div>;
  }

  const boardData = data?.fetchBoard;

  if (!boardData) {
    return <div className="text-center mt-20">게시글을 찾을 수 없습니다.</div>;
  }

  const formattedDate = new Date(boardData.createdAt)
    .toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" })
    .replace(/\./g, ".")
    .trim();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{boardData.title}</h1>
        <div className={styles.meta}>
          <Image src="/images/profile_img.png" alt="프로필" width={24} height={24} className={styles.avatar} />
          <span className={styles.writer}>{boardData.writer}</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className={styles.body}>
        <Image src="/images/beach.png" alt="바다 풍경" width={384} height={216} className={styles.coverImage} />
        <div className={styles.contents}>{boardData.contents}</div>
      </div>

      <div className={styles.videoWrap}>
        <Image src="/images/video_img.jpg" alt="영상" width={768} height={432} className={styles.videoImage} />
        <Image src="/images/play_button.png" alt="재생 버튼" width={48} height={48} className={styles.playButton} />
      </div>

      <div className={styles.footer}>
        <div className={styles.likes}>
          <div className={styles.likeItem}>
            <Image src="/images/good.png" alt="좋아요" width={24} height={24} className={styles.likeIcon} />
            <span>{boardData.likeCount}</span>
          </div>
          <div className={styles.likeItem}>
            <Image src="/images/bad.png" alt="싫어요" width={24} height={24} className={styles.likeIcon} />
            <span>{boardData.dislikeCount}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <button className={styles.actionButton} onClick={onClickMoveToList}>
            <Image src="/images/list.png" alt="목록" width={20} height={20} className={styles.actionIcon} />
            목록으로
          </button>
          <button className={styles.actionButton} onClick={onClickMoveToEdit}>
            <Image src="/images/edit_pen.png" alt="수정" width={20} height={20} className={styles.actionIcon} />
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
}


