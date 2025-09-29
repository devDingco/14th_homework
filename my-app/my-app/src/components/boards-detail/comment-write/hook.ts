"use client";

import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/gql/graphql";

export const useCommentWrite = () => {
  const params = useParams();

  const [createBoardComment] = useMutation(CreateBoardCommentDocument);

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const { data, refetch } = useQuery(FetchBoardCommentsDocument);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const onChangeRating = (e: number) => {
    setRating(e);
  };

  const onClickComment = () => {
    setIsModalOpen(false);
  };

  const onClickEditComment = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const 등록버튼비활성화 = !writer || !password || !comment;

  const handleOk = async () => {
    try {
      const { data } = await createBoardComment({
        // 위에 애랑 밑에 두개랑 같은거. 밑에 애들을 짧게 구조분해한거.
        // const result = await newComment(...);
        // const data = result.data;
        //
        variables: {
          createBoardCommentInput: {
            writer: writer,
            password: password,
            contents: comment,
            rating: rating,
          },
          boardId: params.boardId.toString(),
        },
        refetchQueries: [
          {
            query: FetchBoardCommentsDocument,
            variables: { boardId: params.boardId.toString() },
          },
        ],
      });
      if (data?.createBoardComment) {
        setModalContent("댓글 등록이 완료 되었습니다!");
        setIsModalOpen(true);
        // modal 창 뜬 후에 input들 초기화 형태로 만들어주기
        setWriter("");
        setPassword("");
        setComment("");
      } else {
        setModalContent("댓글 등록에 실패하였습니다");
        setIsModalOpen(true);
      }
    } catch (err: any) {
      setModalContent("에러가 발생하였습니다. 다시 시도해 주세요.");
      setIsModalOpen(true);
      console.error(err);
    }
  };

  return {
    writer,
    password,
    comment,
    rating,
    data,
    등록버튼비활성화,
    isModalOpen,
    modalContent,
    handleOk,
    handleCancel,
    onChangeWriter,
    onChangePassword,
    onChangeComment,
    onChangeRating,
    onClickComment,
    onClickEditComment,
  };
};
