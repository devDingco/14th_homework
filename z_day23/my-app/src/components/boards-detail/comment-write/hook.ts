// src/components/comment-write/hook.ts

import { useMutation } from "@apollo/client";
import { useState, useCallback } from "react";
import { CREATE_BOARD_COMMENT, UPDATE_BOARD_COMMENT } from "./queries";
import { FETCH_BOARD_COMMENTS } from "../comment-list/queries";

export const useCommentWrite = (
  boardId: string,
  onEditComplete?: () => void
) => {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [rating, setRating] = useState(0);

  const [createBoardComment] = useMutation(CREATE_BOARD_COMMENT);
  const [updateBoardComment] = useMutation(UPDATE_BOARD_COMMENT);

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

  // ✅ 수정된 onClickUpdate 함수
  const onClickUpdate = async (commentId: string) => {
    // 1. 유효성 검사: 수정 시에도 비밀번호와 내용은 필수입니다.
    if (!password || !contents) {
      setModalMessage("비밀번호와 내용을 모두 입력해주세요.");
      return;
    }

    try {
      await updateBoardComment({
        variables: {
          // ✅ password는 updateBoardCommentInput과 별개로 전달되어야 합니다.
          // GraphQL 스키마에 따라 updateBoardComment 뮤테이션이 password를
          // updateBoardCommentInput과 별도의 인자로 받기 때문입니다.
          password: password,
          boardCommentId: commentId,
          updateBoardCommentInput: {
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

      setModalMessage("댓글이 성공적으로 수정되었습니다.");

      // 2. 수정창 닫고 화면 갱신을 위한 콜백 함수 호출
      if (onEditComplete) {
        onEditComplete();
      }
    } catch (error: any) {
      console.error("댓글 수정 중 오류 발생:", error);
      setModalMessage("댓글 수정에 실패했습니다. 비밀번호를 확인해주세요.");
    }
  };

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
    onClickUpdate,
    modalMessage,
    setModalMessage,
  };
};
