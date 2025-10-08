// src/components/boards-write/hook.ts

"use client";

import { useState, ChangeEvent, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter, useParams } from "next/navigation";
import { CREATE_BOARD, UPDATE_BOARD, FETCH_BOARD } from "./queries";
import { IUpdateBoardInput, CreateBoardDocument, UpdateBoardDocument, FetchBoardDocument } from "@/commons/graphql/graphql";

export const useBoardWrite = (isEdit: boolean) => {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId as string;

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState(""); //  유튜브 주소 상태
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const { data } = useQuery(FetchBoardDocument, { variables: { boardId }, skip: !isEdit });

  const onChangeWriter = (e: ChangeEvent<HTMLInputElement>) => setWriter(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onChangeContents = (e: ChangeEvent<HTMLTextAreaElement>) => setContents(e.target.value);
  const onChangeYoutubeUrl = (e: ChangeEvent<HTMLInputElement>) => setYoutubeUrl(e.target.value); 
  const onChangeAddressDetail = (e: ChangeEvent<HTMLInputElement>) => setAddressDetail(e.target.value);
  
  const handleToggleModal = () => setIsModalOpen((prev) => !prev);
  const handleComplete = (data: any) => {
    setZipcode(data.zonecode);
    setAddress(data.address);
    handleToggleModal();
  };

  const onClickSubmit = async () => { /* 등록 로직 */ };

  const onClickUpdate = async () => {
    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    if (title) updateBoardInput.title = title;
    if (contents) updateBoardInput.contents = contents;
    if (youtubeUrl) updateBoardInput.youtubeUrl = youtubeUrl; // 👈 변경된 youtubeUrl을 담습니다.
    if (zipcode || address || addressDetail) {
      updateBoardInput.boardAddress = {};
      if (zipcode) updateBoardInput.boardAddress.zipcode = zipcode;
      if (address) updateBoardInput.boardAddress.address = address;
      if (addressDetail) updateBoardInput.boardAddress.addressDetail = addressDetail;
    }

    try {
      await updateBoard({
        variables: {
          boardId,
          password,
          updateBoardInput, // 👈 youtubeUrl이 담긴 객체를 서버로 전송
        },
      });
      alert("게시글이 성공적으로 수정되었습니다.");
      router.push(`/boards/${boardId}`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    if (data?.fetchBoard) {
      setWriter(data.fetchBoard.writer ?? "");
      setTitle(data.fetchBoard.title);
      setContents(data.fetchBoard.contents);
      setYoutubeUrl(data.fetchBoard.youtubeUrl ?? ""); // 👈 기존 유튜브 주소 불러오기
      setZipcode(data.fetchBoard.boardAddress?.zipcode ?? "");
      setAddress(data.fetchBoard.boardAddress?.address ?? "");
      setAddressDetail(data.fetchBoard.boardAddress?.addressDetail ?? "");
    }
  }, [data]);

  const isActive = writer && password && title && contents;

  return {
    writer, 
    password, 
    title,
    contents, 
    youtubeUrl, 
    zipcode, 
    address, 
    addressDetail,
    isModalOpen, 
    data, 
    isActive,
    onChangeWriter, 
    onChangePassword, 
    onChangeTitle, 
    onChangeContents, 
    onChangeYoutubeUrl,
    onChangeAddressDetail, 
    handleToggleModal, 
    handleComplete,
    onClickSubmit, 
    onClickUpdate,
  };
};