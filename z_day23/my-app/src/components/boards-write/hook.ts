// src/components/boards-detail/hook.ts
"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ApolloError, useMutation, useQuery } from "@apollo/client";

import {
  CreateBoardDocument,
  CreateBoardMutation,
  CreateBoardMutationVariables,
  UpdateBoardInput,
  UpdateBoardWriteDocument,
  UpdateBoardWriteMutation,
  UpdateBoardWriteMutationVariables,
  FetchBoardWriteDocument,
  FetchBoardWriteQuery,
  FetchBoardWriteQueryVariables,
} from "@/commons/graphql/graphql";

type FormFields = {
  writer: string;
  password: string;
  title: string;
  contents: string;
};

export const useBoardsForm = () => {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params?.boardId;
  const boardId = (params?.boardId as string) ?? "";

  const { data: boardData } = useQuery<
    FetchBoardWriteQuery,
    FetchBoardWriteQueryVariables
  >(FetchBoardWriteDocument, {
    variables: { boardId },
    skip: !isEdit,
  });

  const [formFields, setFormFields] = useState<FormFields>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [youtubeUrl, setYoutubeUrl] = useState("");

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  const [createBoardMutation] = useMutation<
    CreateBoardMutation,
    CreateBoardMutationVariables
  >(CreateBoardDocument);

  const [updateBoardMutation] = useMutation<
    UpdateBoardWriteMutation,
    UpdateBoardWriteMutationVariables
  >(UpdateBoardWriteDocument);

  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalRedirect, setModalRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && boardData?.fetchBoard) {
      const board = boardData.fetchBoard;

      setFormFields({
        writer: board.writer ?? "",
        password: "",
        title: board.title,
        contents: board.contents,
      });

      setZipCode(board.boardAddress?.zipcode ?? "");
      setAddress(board.boardAddress?.address ?? "");
      setAddressDetail(board.boardAddress?.addressDetail ?? "");
      setYoutubeUrl(board.youtubeUrl ?? "");
    }
  }, [boardData, isEdit]);

  useEffect(() => {
    const { writer, password, title, contents } = formFields;
    if (!isEdit) {
      setIsFormValid(!!(writer && password && title && contents));
    } else {
      setIsFormValid(!!(title && contents));
    }
  }, [formFields, isEdit]);

  const onChangeFormField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "writer" && writerError) setWriterError("");
    if (name === "password" && passwordError) setPasswordError("");
    if (name === "title" && titleError) setTitleError("");
    if (name === "contents" && contentError) setContentError("");
  };

  const onChangeZipCode = (value: string) => setZipCode(value);
  const onChangeAddress = (value: string) => setAddress(value);
  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) =>
    setAddressDetail(event.target.value);
  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) =>
    setYoutubeUrl(event.target.value);

  const onClickSubmit = async () => {
    const { writer, password, title, contents } = formFields;
    let hasError = false;

    if (!writer.trim()) {
      setWriterError("필수입력 사항입니다.");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("필수입력 사항입니다.");
      hasError = true;
    }
    if (!title.trim()) {
      setTitleError("필수입력 사항입니다.");
      hasError = true;
    }
    if (!contents.trim()) {
      setContentError("필수입력 사항입니다.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const result = await createBoardMutation({
        variables: {
          createBoardInput: {
            writer,
            password,
            title,
            contents,
            youtubeUrl,
            boardAddress: {
              zipcode: zipCode,
              address,
              addressDetail,
            },
          },
        },
      });

      const newId = result.data?.createBoard._id;
      setModalMessage("게시글이 성공적으로 등록되었습니다!");
      setModalRedirect(newId ? `/boards/${newId}` : `/boards/`);
    } catch (error) {
      console.error(error);
      setModalMessage("게시글 등록에 실패했습니다.");
      setModalRedirect(null);
    }
  };

  const onClickUpdate = async (inputPassword: string) => {
    if (!boardId) return;

    if (!inputPassword) {
      setModalMessage("비밀번호를 입력해야 수정할 수 있습니다.");
      setModalRedirect(null);
      return;
    }

    try {
      const { title, contents } = formFields;
      const updateBoardInput: UpdateBoardInput = {
        title,
        contents,
        youtubeUrl,
        boardAddress: {
          zipcode: zipCode,
          address,
          addressDetail,
        },
      };

      const result = await updateBoardMutation({
        variables: {
          boardId: boardId,
          password: inputPassword,
          updateBoardInput: updateBoardInput,
        },
      });

      const updatedId = result.data?.updateBoard._id;
      setModalMessage("게시글이 성공적으로 수정되었습니다!");
      setModalRedirect(updatedId ? `/boards/${updatedId}` : `/boards/`);
    } catch (error) {
      console.error(error);
      if (error instanceof ApolloError) {
        if (error.graphQLErrors?.[0]?.message.includes("password")) {
          setModalMessage("비밀번호가 틀렸습니다.");
        } else {
          setModalMessage("게시글 수정에 실패했습니다.");
        }
      } else {
        setModalMessage("게시글 수정에 실패했습니다.");
      }
      setModalRedirect(null);
    }
  };

  return {
    formFields,
    writerError,
    passwordError,
    titleError,
    contentError,
    isFormValid,
    onChangeFormField,
    onClickSubmit,
    onClickUpdate,
    zipCode,
    address,
    addressDetail,
    onChangeZipCode,
    onChangeAddress,
    onChangeAddressDetail,
    youtubeUrl,
    onChangeYoutubeUrl,
    modalMessage,
    setModalMessage,
    modalRedirect,
    setModalRedirect,
  };
};
