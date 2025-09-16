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

export const useBoardsForm = () => {
  const router = useRouter();
  const params = useParams();
  const isEdit = !!params?.boardId;
  const boardId = (params?.boardId as string) ?? "";

  // 게시글 데이터 불러오기 (fetchBoard API 사용)
  const { data: boardData } = useQuery<
    FetchBoardWriteQuery,
    FetchBoardWriteQueryVariables
  >(FetchBoardWriteDocument, {
    variables: { boardId },
    skip: !isEdit,
  });

  // 기본 입력 상태들
  const [writerInput, setWriterInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  // 주소 관련 상태들
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  // 유튜브 URL 상태
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // 에러 상태들
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

  // ---------- 모달 관련 상태 (alert 대체) ----------
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalRedirect, setModalRedirect] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && boardData?.fetchBoard) {
      const board = boardData.fetchBoard;
      setWriterInput(board.writer ?? "");
      setTitleInput(board.title);
      setContentInput(board.contents);

      // 우편번호, 기본주소, 상세주소 초기값 설정
      setZipCode(board.boardAddress?.zipcode ?? "");
      setAddress(board.boardAddress?.address ?? "");
      setAddressDetail(board.boardAddress?.addressDetail ?? "");

      // 유튜브 URL 초기값 설정
      setYoutubeUrl(board.youtubeUrl ?? "");
    }
  }, [boardData, isEdit]);

  // 폼 유효성 검사
  useEffect(() => {
    if (!isEdit) {
      setIsFormValid(
        !!(writerInput && passwordInput && titleInput && contentInput)
      );
    } else {
      setIsFormValid(!!(titleInput && contentInput));
    }
  }, [writerInput, passwordInput, titleInput, contentInput, isEdit]);

  // 입력 핸들러들
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

  // 주소 관련 핸들러들
  const onChangeZipCode = (value: string) => setZipCode(value);
  const onChangeAddress = (value: string) => setAddress(value);
  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) =>
    setAddressDetail(event.target.value);

  // 유튜브 URL 핸들러
  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) =>
    setYoutubeUrl(event.target.value);

  // 게시글 등록
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
            youtubeUrl: youtubeUrl,
            boardAddress: {
              zipcode: zipCode,
              address: address,
              addressDetail: addressDetail,
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

  // 게시글 수정 (updateBoard API 사용) — 비밀번호는 외부에서 받아 처리
  const onClickUpdate = async (inputPassword: string) => {
    if (!boardId) return;

    if (!inputPassword) {
      setModalMessage("비밀번호를 입력해야 수정할 수 있습니다.");
      setModalRedirect(null);
      return;
    }

    try {
      const updateBoardInput: UpdateBoardInput = {
        title: titleInput,
        contents: contentInput,
        youtubeUrl: youtubeUrl,
        boardAddress: {
          zipcode: zipCode,
          address: address,
          addressDetail: addressDetail,
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
    // 주소 관련 반환값들
    zipCode,
    address,
    addressDetail,
    onChangeZipCode,
    onChangeAddress,
    onChangeAddressDetail,
    // 유튜브 URL 관련 반환값들
    youtubeUrl,
    onChangeYoutubeUrl,
    // 모달 관련
    modalMessage,
    setModalMessage,
    modalRedirect,
    setModalRedirect,
  };
};
