"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, ApolloError } from "@apollo/client";
import { useRouter } from "next/navigation";
import { CreateBoardDocument, UpdateBoardDocument, FetchBoardForEditDocument } from "@/commons/graphql/graphql";
import type { BoardsWriteProps, ErrorsState, UpdateBoardInput } from "./types";

export function useBoardsWrite(props: BoardsWriteProps) {
  const router = useRouter();

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const { data, loading, error } = useQuery(FetchBoardForEditDocument, {
    variables: { boardId: props.boardId as string },
    skip: !props.isEdit || !props.boardId,
  });

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [boardAddress, setBoardAddress] = useState({
    zipcode: "",
    address: "",
    addressDetail: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState<ErrorsState>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  useEffect(() => {
    if (props.isEdit && data && data.fetchBoard) {
      const boardData = data.fetchBoard;
      setWriter(boardData.writer ?? "");
      setTitle(boardData.title ?? "");
      setContents(boardData.contents ?? "");
      setYoutubeUrl(boardData.youtubeUrl ?? "");
      setBoardAddress({
        zipcode: boardData.boardAddress?.zipcode ?? "",
        address: boardData.boardAddress?.address ?? "",
        addressDetail: boardData.boardAddress?.addressDetail ?? "",
      });
      setImages(boardData.images ?? []);
    }
  }, [props.isEdit, data]);

  const isFormValid = writer && password && title && contents;

  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => setWriter(event.target.value);
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const onChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => setContents(event.target.value);
  const onChangeYoutubeUrl = (event: React.ChangeEvent<HTMLInputElement>) => setYoutubeUrl(event.target.value);
  const onChangeBoardAddressZipcode = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBoardAddress({ ...boardAddress, zipcode: event.target.value });
  const onChangeBoardAddressAddress = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBoardAddress({ ...boardAddress, address: event.target.value });
  const onChangeBoardAddressAddressDetail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setBoardAddress({ ...boardAddress, addressDetail: event.target.value });

  const onClickSubmit = async () => {
    let hasError = false;
    const newErrors: ErrorsState = { writer: "", password: "", title: "", contents: "" };

    if (!writer) {
      newErrors.writer = "필수입력 사항입니다.";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "필수입력 사항입니다.";
      hasError = true;
    }
    if (!title) {
      newErrors.title = "필수입력 사항입니다.";
      hasError = true;
    }
    if (!contents) {
      newErrors.contents = "필수입력 사항입니다.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    try {
      const createBoardInput = {
        writer,
        password,
        title,
        contents,
        youtubeUrl: youtubeUrl || "",
        boardAddress: {
          zipcode: boardAddress.zipcode || "",
          address: boardAddress.address || "",
          addressDetail: boardAddress.addressDetail || "",
        },
        images: images || [""],
      };

      const result = await createBoard({
        variables: { createBoardInput },
      });
      alert("게시글이 성공적으로 등록되었습니다.");
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      const apolloError = error as ApolloError;
      console.error(apolloError);
      alert(apolloError.message || "에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  const onClickUpdate = async () => {
    const myPassword = window.prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요");
    if (!myPassword) return;

    try {
      const updateBoardInput: UpdateBoardInput = {};
      const originalData = data?.fetchBoard;

      if (title !== originalData?.title) updateBoardInput.title = title;
      if (contents !== originalData?.contents) updateBoardInput.contents = contents;
      if (youtubeUrl !== originalData?.youtubeUrl) updateBoardInput.youtubeUrl = youtubeUrl;
      if (
        boardAddress.zipcode !== originalData?.boardAddress?.zipcode ||
        boardAddress.address !== originalData?.boardAddress?.address ||
        boardAddress.addressDetail !== originalData?.boardAddress?.addressDetail
      ) {
        updateBoardInput.boardAddress = {
          zipcode: boardAddress.zipcode,
          address: boardAddress.address,
          addressDetail: boardAddress.addressDetail,
        };
      }
      if (JSON.stringify(images) !== JSON.stringify(originalData?.images)) {
        updateBoardInput.images = images;
      }

      await updateBoard({
        variables: {
          boardId: props.boardId as string,
          password: myPassword,
          updateBoardInput,
        },
      });

      alert("수정 완료!");
      router.push(`/boards/${props.boardId}`);
    } catch (error) {
      const apolloError = error as ApolloError;
      console.error(apolloError);
      if (apolloError.graphQLErrors?.[0]?.message.includes("비밀번호가 일치하지 않습니다.")) {
        alert("비밀번호가 틀렸습니다.");
      } else {
        alert(apolloError.message);
      }
    }
  };

  const onClickCancel = () => router.push("/boards");

  return {
    router,
    data,
    loading,
    error,
    writer,
    password,
    title,
    contents,
    youtubeUrl,
    boardAddress,
    images,
    errors,
    setWriter,
    setPassword,
    setTitle,
    setContents,
    setYoutubeUrl,
    setBoardAddress,
    setImages,
    isFormValid,
    onChangeWriter,
    onChangePassword,
    onChangeTitle,
    onChangeContents,
    onChangeYoutubeUrl,
    onChangeBoardAddressZipcode,
    onChangeBoardAddressAddress,
    onChangeBoardAddressAddressDetail,
    onClickSubmit,
    onClickUpdate,
    onClickCancel,
  };
}


