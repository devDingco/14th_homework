"use client";

import { useState } from "react";
import { Rate } from "antd";
import { IComment } from "../comment-list/types";
import CommentWrite from "../comment-write"; // ✅ 수정 모드 시 불러올 작성 컴포넌트
import styles from "../detail/styles.module.css";
import { EditOutlined } from "@ant-design/icons";

interface ICommentListItemProps {
  comment: IComment;
  boardId: string;
  refetchComments: () => void;
}

export default function CommentListItem({
  comment,
  boardId,
  refetchComments,
}: ICommentListItemProps) {
  const [isEdit, setIsEdit] = useState(false);

  const onClickEdit = () => {
    setIsEdit(true);
  };

  const onEditComplete = () => {
    setIsEdit(false); // 수정창 닫기
    refetchComments(); // 댓글 목록 갱신
  };

  // ✅ 수정 모드일 경우 → CommentWrite 컴포넌트로 교체
  if (isEdit) {
    return (
      <CommentWrite
        boardId={boardId}
        isEdit={true}
        comment={comment}
        onEditComplete={onEditComplete}
      />
    );
  }

  // ✅ 기본 모드 (댓글 보기 모드)
  return (
    <div className={styles.comment_list_item_with_icons}>
      <div className={styles.comment_info}>
        <div className={styles.comment_info_row}>
          <img
            src="/images/profile.png"
            alt="프로필"
            className={styles.profile_icon}
          />
          <div className={styles.comment_writer}>{comment.writer}</div>
          <br />
          <Rate value={comment.rating} />
        </div>
        <div className={styles.comment_icons}>
          <EditOutlined className={styles.edit_icon} onClick={onClickEdit} />
        </div>
      </div>
      <div className={styles.comment_contents_with_icons}>
        <div className={styles.comment_contents}>{comment.contents}</div>
        <span className={styles.comment_createdAt}>{comment.createdAt}</span>
      </div>
    </div>
  );
}
