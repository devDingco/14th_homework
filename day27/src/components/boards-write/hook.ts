"use client";

import { useMutation } from "@apollo/client";
import {
 //  댓글 생성과, 댓글 목록 리프레시를 위한 Document를 import 합니다.
  CreateBoardCommentDocument, 
  FetchBoardCommentsDocument,
} from "commons/graphql/graphql";
import { useParams } from "next/navigation";
import { useState, ChangeEvent } from "react";

export const useCommentCreate = () => {
  // ❗️useMutation에 방금 import한 변수를 넣어줍니다.
  const [newComment] = useMutation(CreateBoardCommentDocument); 
  const [commentWriter, setCommentWriter] = useState("");
  const [commentPassword, setCommentPassword] = useState("");
  const [commentText, setCommentText] = useState("");

  const params = useParams();
  const id = params.boardId.toString();

  const isButtonDisabled = !commentWriter || !commentPassword || !commentText;

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentWriter(event.target.value);
  };

  const onChangePW = (event: ChangeEvent<HTMLInputElement>) => {
    setCommentPassword(event.target.value);
  };

  const onChangeText = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(event.target.value);
  };

  const createComment = async () => {
    if (isButtonDisabled) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    try {
      const { data } = await newComment({
        variables: {
          createBoardCommentInput: {
            writer: commentWriter,
            password: commentPassword,
            contents: commentText,
            rating: 0.0,
          },
          boardId: id,
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { boardId: id },
          },
        ],
      });
      if (data?.createBoardComment) {
        alert("댓글 등록이 완료 되었습니다!");
        setCommentWriter("");
        setCommentPassword("");
        setCommentText("");
      } else {
        alert("댓글 등록에 실패하였습니다");
      }
    } catch (err) {
      console.error(err);
      alert("댓글 등록 중 오류가 발생했습니다.");
    }
  };

  return {
    isButtonDisabled,
    onChangeWriter,
    onChangePW,
    onChangeText,
    commentWriter,
    commentPassword,
    commentText,
    createComment,
  };
};