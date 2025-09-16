"use client";

import { Rate } from "antd";
import { IComment, ICommentListProps } from "./types";
import { useCommentList } from "./hook";
import styles from "../detail/styles.module.css";

export default function CommentList({ boardId }: ICommentListProps) {
  const { data, loading, error } = useCommentList(boardId);

  if (loading) return <div>댓글 목록을 불러오는 중입니다...</div>;
  if (error) return <div>댓글 목록을 불러오는 데 실패했습니다.</div>;

  return (
    <div className={styles.boards}>
      <div className={styles.boards_body}>
        {data?.fetchBoardComments?.length === 0 ? (
          <div>등록된 댓글이 없습니다.</div>
        ) : (
          data?.fetchBoardComments.map((comment: IComment) => (
            <div
              key={comment._id}
              className={styles.comment_list_item_with_icons}
            >
              <div className={styles.comment_info}>
                <img
                  src="/images/profile.png"
                  alt="프로필"
                  className={styles.profile_icon}
                />
                <div className={styles.comment_writer}>{comment.writer}</div>
                <br />
                <Rate value={comment.rating} />
              </div>
              <div className={styles.comment_contents_with_icons}>
                <div className={styles.comment_contents}>
                  {comment.contents}
                </div>
                <span className={styles.comment_createdAt}>
                  {comment.createdAt}
                </span>
                {/* <div className={styles.comment_icons}>
                <img
                  src="/images/edit.png"
                  alt="수정"
                  className={styles.edit_icon}
                />
                <img
                  src="/images/delete.png"
                  alt="삭제"
                  className={styles.delete_icon}
                />
              </div> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
