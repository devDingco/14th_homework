"use client";

import React, { useMemo, useState } from "react";
import { useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./queries";

export default function useCommentWrite() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const { boardId } = useParams<{ boardId: string }>();
  const [createBoardComment, { loading }] = useMutation(CREATE_BOARD_COMMENT);

  const commentCount = comment.length;
  const isDisabled = useMemo(() => {
    return (
      writer.trim().length === 0 ||
      password.trim().length === 0 ||
      comment.trim().length === 0
    );
  }, [writer, password, comment]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled || !boardId) return;
    try {
      await createBoardComment({
        variables: {
          boardId,
          createBoardCommentInput: {
            writer,
            password,
            contents: comment,
            rating: 0,
          },
        },
        refetchQueries: [
          { query: FETCH_BOARD_COMMENTS, variables: { boardId } },
        ],
        awaitRefetchQueries: true,
      });
      setWriter("");
      setPassword("");
      setComment("");
    } catch (error) {
      console.error(error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  return {
    writer,
    setWriter,
    password,
    setPassword,
    comment,
    setComment,
    commentCount,
    isDisabled,
    onSubmit,
    loading,
  };
}
