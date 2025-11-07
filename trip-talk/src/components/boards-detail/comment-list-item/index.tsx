"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { Rate } from "antd";
import CommentWrite from "../comment-write";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import {
  DELETE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from "../comment-write/queries";

export default function CommentListItem(props) {
  const [isEdit, setIsEdit] = useState(false);
  const board_params = useParams();
  const [deleteBoardComment] = useMutation(DELETE_BOARD_COMMENT);

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onClickDelete = async () => {
    const password = prompt("댓글을 삭제하려면 비밀번호를 입력해주세요.");
    if (!password) {
      alert("비밀번호를 입력해야 삭제할 수 있습니다.");
      return;
    }

    if (!confirm("정말로 이 댓글을 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteBoardComment({
        variables: {
          password: password,
          boardCommentId: props.el._id,
        },
        update(cache, { data }) {
          // 캐시에서 해당 댓글을 제거
          cache.modify({
            fields: {
              fetchBoardComments(existingComments = [], { readField }) {
                return existingComments.filter(
                  (commentRef: any) =>
                    props.el._id !== readField("_id", commentRef)
                );
              },
            },
          });
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: board_params.boardId },
          },
        ],
        awaitRefetchQueries: true, // refetch가 완료될 때까지 대기
      });
      alert("댓글이 삭제되었습니다.");
    } catch (error: any) {
      alert(error.message || "댓글 삭제 중 오류가 발생했습니다.");
    }
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
            <Image
              src={"/images/삭제.png"}
              width={20}
              height={20}
              alt="삭제"
              onClick={onClickDelete}
              style={{ cursor: "pointer" }}
            />
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
