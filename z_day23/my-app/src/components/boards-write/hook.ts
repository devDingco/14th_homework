"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ApolloError, useMutation } from "@apollo/client";

import {
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
  UpdateBoardInput,
  UpdateBoardWriteDocument,
  UpdateBoardWriteMutation,
  UpdateBoardWriteMutationVariables,
} from "@/commons/graphql/graphql";

// Custom hook to handle all board form logic
export const useBoardsForm = () => {
  const router = useRouter();
  const params = useParams(); // Get URL parameters
  const isEdit = !!params.boardId; // Check if in edit mode from URL
  const boardId = params.boardId as string;

  // Input states
  const [writerInput, setWriterInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  // Error states
  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // Form active state
  const [isFormValid, setIsFormValid] = useState(false);

  // GraphQL mutation hooks
  const [createBoardMutation] = useMutation<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >(CreateBoardDocument);
  const [updateBoardMutation] = useMutation<
    UpdateBoardWriteMutation,
    UpdateBoardWriteMutationVariables
  >(UpdateBoardWriteDocument);

  // Activate submit button when all required fields are filled
  useEffect(() => {
    if (!isEdit) {
      if (writerInput && passwordInput && titleInput && contentInput) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    } else {
      if (titleInput && contentInput) {
        setIsFormValid(true);
      } else {
        setIsFormValid(false);
      }
    }
  }, [writerInput, passwordInput, titleInput, contentInput, isEdit]);

  // Input change handlers
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriterInput(event.target.value);
    if (writerError) setWriterError("");
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
    if (passwordError) setPasswordError("");
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value);
    if (titleError) setTitleError("");
  };

  const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContentInput(event.target.value);
    if (contentError) setContentError("");
  };

  // Handle submit button click
  const onClickSubmit = async () => {
    let hasError = false;

    if (!writerInput.trim()) {
      setWriterError("필수입력 사항입니다.");
      hasError = true;
    }
    if (!passwordInput.trim()) {
      setPasswordError("필수입력 사항입니다.");
      hasError = true;
    }
    if (!titleInput.trim()) {
      setTitleError("필수입력 사항입니다.");
      hasError = true;
    }
    if (!contentInput.trim()) {
      setContentError("필수입력 사항입니다.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const result = await createBoardMutation({
        variables: {
          createBoardInput: {
            writer: writerInput,
            password: passwordInput,
            title: titleInput,
            contents: contentInput,
          },
        },
      });

      router.push(`/boards/${result.data?.createBoard._id}`);
      alert("게시글이 성공적으로 등록되었습니다!");
    } catch (error) {
      console.error(error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  // Handle update button click
  const onClickUpdate = async () => {
    if (!boardId) return;

    const inputPassword = prompt("글 작성 시 입력했던 비밀번호를 입력해주세요");
    if (inputPassword === null) {
      return;
    }
    if (!inputPassword) {
      alert("비밀번호를 입력해야 수정할 수 있습니다.");
      return;
    }

    try {
      const updateBoardInput: UpdateBoardInput = {};
      if (titleInput) {
        updateBoardInput.title = titleInput;
      }
      if (contentInput) {
        updateBoardInput.contents = contentInput;
      }

      const result = await updateBoardMutation({
        variables: {
          boardId: boardId,
          password: inputPassword,
          updateBoardInput: updateBoardInput,
        },
      });

      router.push(`/boards/${result.data?.updateBoard._id}`);
      alert("게시글이 성공적으로 수정되었습니다!");
    } catch (error) {
      console.error(error);
      if (error instanceof ApolloError) {
        if (error.graphQLErrors?.[0]?.message.includes("password")) {
          alert("비밀번호가 틀렸습니다.");
        } else {
          alert("게시글 수정에 실패했습니다.");
        }
      } else {
        alert("게시글 수정에 실패했습니다.");
      }
    }
  };

  // Return the states and functions
  return {
    writerInput,
    passwordInput,
    titleInput,
    contentInput,
    writerError,
    passwordError,
    titleError,
    contentError,
    isFormValid,
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onClickSubmit,
    onClickUpdate,
  };
};
