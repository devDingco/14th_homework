// src/components/comment-write/hook.ts
import { useMutation } from "@apollo/client";
import { useState, useCallback } from "react";
import { CREATE_BOARD_COMMENT } from "./queries";
import { FETCH_BOARD_COMMENTS } from "../comment-list/queries";

export const useCommentWrite = (boardId: string) => {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [rating, setRating] = useState(0);

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);

  // ✅ 모달 메시지 상태
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const onClickSubmit = useCallback(async () => {
    if (!writer || !password || !contents) {
      setModalMessage("작성자, 비밀번호, 내용을 모두 입력해주세요.");
      return;
    }

    if (rating === 0) {
      setModalMessage("별점을 선택해주세요.");
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
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId, page: 1 },
          },
        ],
      });

      setModalMessage("댓글이 성공적으로 등록되었습니다.");
      setWriter("");
      setPassword("");
      setContents("");
      setRating(0);
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
      setModalMessage("댓글 등록에 실패했습니다. 콘솔을 확인해주세요.");
    }
  }, [boardId, writer, password, contents, rating, createBoardComment]);

  return {
    writer,
    setWriter,
    password,
    setPassword,
    contents,
    setContents,
    rating,
    setRating,
    onClickSubmit,
    modalMessage,
    setModalMessage,
  };
};
