"use client";

import { useMemo, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOARD_COMMENT, FETCH_BOARD_COMMENTS } from "./queries";
import type { CommentWriteProps } from "./types";

export function useCommentWrite(props: CommentWriteProps) {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState("");
  const [rating, setRating] = useState(0);

  const [createBoardComment, { loading }] = useMutation(CREATE_BOARD_COMMENT, {
    refetchQueries: [
      { query: FETCH_BOARD_COMMENTS, variables: { boardId: props.boardId, page: 1 } },
    ],
  });

  const isValid = useMemo(() => writer.trim() && password.trim() && contents.trim(), [writer, password, contents]);

  const onClickSubmit = async () => {
    if (!isValid) return;
    await createBoardComment({
      variables: {
        boardId: props.boardId,
        createBoardCommentInput: { writer, password, contents, rating },
      },
    });
    setWriter("");
    setPassword("");
    setContents("");
    setRating(0);
  };

  return {
    writer,
    password,
    contents,
    rating,
    setWriter,
    setPassword,
    setContents,
    setRating,
    isValid,
    onClickSubmit,
    loading,
  };
}


