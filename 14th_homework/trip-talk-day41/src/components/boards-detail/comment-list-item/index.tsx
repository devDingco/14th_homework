"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Rate } from "antd";
import CommentWrite from "../comment-write";
export default function CommentListItem(props) {
  const [isEdit, setIsEdit] = useState(false);
  const onClickEdit = () => {
    setIsEdit(true);
  };
  const date = props.el.createdAt
    ? new Date(props.el.createdAt).toISOString().split("T")[0]
    : "";
  return isEdit ? (
    <div key={props.el._id}>
      <CommentWrite isEdit={true} commentId={props.el._id} el={props.el} />
    </div>
  ) : (
    <div id={props.el._id} key={props.el._id} className={styles.댓글리스트}>
      <div className={styles.commentBox}>
        <div className={styles.commentHeader}>
          <div className={styles.leftGroup}>
            <span className={styles.commentWriter}>{props.el.writer}</span>
            <span className={styles.commentRating}>
              {" "}
              <Rate value={props.el.rating} />
            </span>
          </div>

          <div className={styles.commentActions}>
            <Image
              src={"/images/수정.png"}
              width={20}
              height={20}
              alt="수정"
              onClick={onClickEdit}
            />
            <Image src={"/images/삭제.png"} width={20} height={20} alt="삭제" />
          </div>
        </div>

        <div className={styles.commentBody}>
          <p>{props.el.contents}</p>
        </div>

        <div className={styles.commentFooter}>
          <span className="comment-date">{date}</span>
        </div>
      </div>
    </div>
  );
}
