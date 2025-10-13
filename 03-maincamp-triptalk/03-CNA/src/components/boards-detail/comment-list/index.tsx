"use client";

import React from "react";
import styles from "./styles.module.css";
import { formatDate } from "@/utils/formatDate";
import unknownIcon from "@/assets/icons/unknown.png";
import editIcon from "@/assets/icons/edit.png";
import deleteIcon from "@/assets/icons/close.png";
import fiveStars from "@/assets/images/fivestars.png";
import useCommentList from "./hook";

export default function CommentList() {
  const { comments } = useCommentList();

  return (
    <div className={styles.listFrame}>
      <div className={styles.listBody}>
        <section className={styles.listContainer} aria-label="댓글 목록">
          {comments.map((comment: any) => (
            <article className={styles.item} key={comment._id}>
              <header className={styles.itemHeader}>
                <div className={styles.writerBox}>
                  <img
                    src={unknownIcon.src}
                    alt="프로필"
                    className={styles.profileIcon}
                  />
                  <span className={styles.writer}>{comment.writer}</span>
                  <img
                    src={fiveStars.src}
                    alt="별점"
                    className={styles.stars}
                  />
                </div>
                <div className={styles.itemActions}>
                  <img
                    src={editIcon.src}
                    alt="수정"
                    className={styles.actionIcon}
                  />
                  <img
                    src={deleteIcon.src}
                    alt="삭제"
                    className={styles.actionIcon}
                  />
                </div>
              </header>
              <p className={styles.contents}>{comment.contents}</p>
              <span className={styles.date}>
                {formatDate(comment.createdAt)}
              </span>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
