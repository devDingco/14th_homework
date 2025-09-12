"use client";

import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { CREATE_BOARD_COMMENTS, FETCH_BOARD_COMMENTS } from "./queries";

export default function useCommentWrite() {
  const board_params = useParams();
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [create_board_comment_api] = useMutation(CREATE_BOARD_COMMENTS);
  // const router = useRouter();
  const onClickCreateComment = async () => {
    if (!board_params.boardId) {
      console.error("boardId is missing!");
      return;
    }
    try {
      console.log({
        createBoardCommentInput: {
          writer,
          password,
          contents: comment,
          rating: 0.0,
        },
        boardId: board_params.boardId,
      });
      await create_board_comment_api({
        variables: {
          createBoardCommentInput: {
            writer: writer,
            password: password,
            contents: comment,
            rating: 0.0,
          },
          boardId: board_params.boardId,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_COMMENTS,
            variables: { boardId: board_params.boardId },
          },
        ],
      });

      setWriter(""); // useCommentWrite 훅 안에서 setter 받아서 초기화
      setPassword("");
      setComment("");
      // router.push(`/boards/${board_params.boardId}`);
    } catch (error) {
      alert(error);
    }
  };

  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  return {
    writer,
    password,
    comment,
    onChangeWriter,
    onChangePassword,
    onChangeComment,
    onClickCreateComment,
  };
}
