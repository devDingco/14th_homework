"use client";
import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import {
  CreateBoardCommentDocument,
  FetchBoardCommentsDocument,
} from "@/commons/graphql/graphql";

export default function useCommentWrite() {
  const params = useParams();

  const [createBoardComment] = useMutation(CreateBoardCommentDocument);
  const {} = useQuery(FetchBoardCommentsDocument, {
    variables: { boardId: String(params.boardId) },
  });

  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [rating, setRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const onChangeAuthor = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
    if (event.target.value !== "" && password !== "" && content !== "") {
      setIsActive(true);
    }
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (author !== "" && event.target.value !== "" && content !== "") {
      setIsActive(true);
    }
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (author !== "" && password !== "" && event.target.value !== "") {
      setIsActive(true);
    }
  };

  const onClickComment = async () => {
    try {
      if (author !== "" && password !== "" && content !== "") {
        const result = await createBoardComment({
          variables: {
            createBoardCommentInput: {
              writer: author,
              password: password,
              contents: content,
              rating: rating,
            },
            boardId: String(params.boardId),
          },
          refetchQueries: [
            {
              query: FetchBoardCommentsDocument,
              variables: { boardId: String(params.boardId) },
            },
          ],
        });
        console.log(result.data?.createBoardComment._id);
      }
      setAuthor("");
      setPassword("");
      setContent("");
      setRating(0);
      setIsActive(false);
    } catch (error) {
      alert(error);
    } finally {
    }
  };
  return {
    onChangePassword,
    onChangeContent,
    onChangeAuthor,
    onClickComment,
    setRating,
    isActive,
    stars,
    author,
    password,
    content,
    rating,
  };
}
