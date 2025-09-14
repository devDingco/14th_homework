"use client";

import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Rate } from "antd";
import { VerySmallInput } from "@/components/boards-write/form-input";
import styles from "../detail/styles.module.css";
import {
  CREATE_BOARD_COMMENT,
  FETCH_BOARD_COMMENTS,
} from "./BoardComment.queries";

interface ICommentWriteProps {
  boardId: string;
}

export default function CommentWrite({ boardId }: ICommentWriteProps) {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [rating] = useState(0);

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const { data, refetch } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId, page: 1 },
  });

  const onClickSubmit = async () => {
    if (!writer || !password || !contents) {
      alert("작성자, 비밀번호, 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await createBoardComment({
        variables: {
          boardId,
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating,
          },
        },
      });

      alert("댓글이 성공적으로 등록되었습니다.");
      setWriter("");
      setPassword("");
      setContents("");
      refetch();
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
      alert("댓글 등록에 실패했습니다. 콘솔을 확인해주세요.");
    }
  };

  return (
    <div className={styles.comment_body}>
      <div className={styles.comment_body_up}>
        <div className={styles.comment_body_up_title}>
          <img src="/images/chat.png" alt="댓글 아이콘" />
          <div className={styles.comment_body_up_title_font}>댓글</div>
        </div>
        <Rate value={rating} disabled />
        <div className={styles.comment_body_field}>
          <div className={styles.comment_body_field_inside}>
            <div className={styles.comment_body_field_inside_writer_password}>
              <VerySmallInput
                Input_Title="작성자"
                Input_Placeholder="작성자 명을 입력해주세요."
                Input_Star="*"
                value={writer}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWriter(e.target.value)
                }
              />
              <VerySmallInput
                Input_Title="비밀번호"
                Input_Placeholder="비밀번호를 입력해주세요."
                Input_Star="*"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </div>
            <textarea
              className={styles.input_comment}
              placeholder="댓글을 입력해주세요."
              value={contents}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setContents(e.target.value)
              }
            ></textarea>
          </div>
          <div className={styles.comment_submit_end}>
            <button className={styles.comment_submit} onClick={onClickSubmit}>
              댓글 등록
            </button>
          </div>
        </div>
      </div>
      <div>
        {data?.fetchBoardComments?.length === 0 ? (
          <div>등록된 댓글이 없습니다.</div>
        ) : (
          data?.fetchBoardComments.map((comment: any) => (
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
