"use client";

import { useEffect, useState, useMemo } from "react";
import { useMutation, useQuery, ApolloError, gql } from "@apollo/client";
import { useRouter } from "next/navigation";
import { CreateBoardDocument, UpdateBoardDocument, FetchBoardForEditDocument } from "@/commons/graphql/graphql";
import { FETCH_BOARD_DETAIL } from "../boards-detail/detail/queries";
import type { BoardsWriteProps, ErrorsState, UpdateBoardInput } from "./types";

// 파일 업로드 GraphQL 쿼리
const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

interface ModalState {
  isOpen: boolean;
  message: string;
  isPrompt: boolean;
  input: string;
  navigatePath: string | null;
  resolve: ((value: string | null) => void) | null;
}

export function useBoardsWrite(props: BoardsWriteProps) {
  const router = useRouter();

  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const { data, loading, error } = useQuery(FetchBoardForEditDocument, {
    variables: { boardId: props.boardId as string },
    skip: !props.isEdit || !props.boardId,
  });

  const [formData, setFormData] = useState({
    writer: "",
    title: "",
    contents: "",
  });
  const [password, setPassword] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [boardAddress, setBoardAddress] = useState({
    zipcode: "",
    address: "",
    addressDetail: "",
  });
  const [images, setImages] = useState<string[]>(["", "", ""]);
  const [isPostcodeModalOpen, setIsPostcodeModalOpen] = useState(false);
  const [errors, setErrors] = useState<ErrorsState>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    message: "",
    isPrompt: false,
    input: "",
    navigatePath: null,
    resolve: null,
  });

  useEffect(() => {
    if (props.isEdit && data && data.fetchBoard) {
      const boardData = data.fetchBoard;
      setFormData({
        writer: boardData.writer ?? "",
        title: boardData.title ?? "",
        contents: boardData.contents ?? "",
      });
      setYoutubeUrl(boardData.youtubeUrl ?? "");
      setBoardAddress({
        zipcode: boardData.boardAddress?.zipcode ?? "",
        address: boardData.boardAddress?.address ?? "",
        addressDetail: boardData.boardAddress?.addressDetail ?? "",
      });
      setImages(boardData.images ?? ["", "", ""]);
    }
  }, [props.isEdit, data]);

  const isFormValid = useMemo(() => {
    // 수정 모드에서는 비밀번호 검증을 제외
    if (props.isEdit) {
      return formData.writer.trim() && formData.title.trim() && formData.contents.trim();
    }
    // 새 게시글 작성 모드에서는 모든 필드 검증
    return formData.writer.trim() && password.trim() && formData.title.trim() && formData.contents.trim();
  }, [formData, password, props.isEdit]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: value.trim() ? "" : `${name} is required`,
    }));
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setPassword(value);
    setErrors((prev) => ({
      ...prev,
      password: value.trim() ? "" : "password is required",
    }));
  };

  const onChangeYoutubeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const onChangeBoardAddressZipcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardAddress((prev) => ({ ...prev, zipcode: event.target.value }));
  };

  const onChangeBoardAddressAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardAddress((prev) => ({ ...prev, address: event.target.value }));
  };

  const onChangeBoardAddressAddressDetail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardAddress((prev) => ({ ...prev, addressDetail: event.target.value }));
  };

  const onClickPostcodeSearch = () => {
    setIsPostcodeModalOpen(true);
  };

  const onCompletePostcode = (data: any) => {
    setBoardAddress({
      ...boardAddress,
      zipcode: data.zonecode,
      address: data.address,
    });
    setIsPostcodeModalOpen(false);
  };

  const onClosePostcodeModal = () => {
    setIsPostcodeModalOpen(false);
  };

  const showAlert = (message: string, navigatePath: string | null = null) => {
    setModalState({
      isOpen: true,
      message,
      isPrompt: false,
      input: "",
      navigatePath,
      resolve: null,
    });
  };

  const showPrompt = (message: string): Promise<string | null> => {
    return new Promise((resolve) => {
      setModalState({
        isOpen: true,
        message,
        isPrompt: true,
        input: "",
        navigatePath: null,
        resolve,
      });
    });
  };

  const handlePromptConfirm = () => {
    if (modalState.resolve) {
      modalState.resolve(modalState.input);
    }
    setModalState({ ...modalState, isOpen: false });
  };

  const handlePromptCancel = () => {
    if (modalState.resolve) {
      modalState.resolve(null);
    }
    setModalState({ ...modalState, isOpen: false });
  };

  const handleCloseModal = () => {
    setModalState({ ...modalState, isOpen: false });
    if (modalState.navigatePath) {
      router.push(modalState.navigatePath);
    }
  };

  const onChangePromptInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModalState({ ...modalState, input: event.target.value });
  };

  const onClickSubmit = async () => {
    let hasError = false;
    const newErrors: ErrorsState = { writer: "", password: "", title: "", contents: "" };

    if (!formData.writer) {
      newErrors.writer = "필수입력 사항입니다.";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "필수입력 사항입니다.";
      hasError = true;
    }
    if (!formData.title) {
      newErrors.title = "필수입력 사항입니다.";
      hasError = true;
    }
    if (!formData.contents) {
      newErrors.contents = "필수입력 사항입니다.";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) {
      showAlert("모든 필수 항목을 입력해주세요.");
      return;
    }

    try {
      const createBoardInput = {
        writer: formData.writer,
        password,
        title: formData.title,
        contents: formData.contents,
        youtubeUrl: youtubeUrl || "",
        boardAddress: {
          zipcode: boardAddress.zipcode || "",
          address: boardAddress.address || "",
          addressDetail: boardAddress.addressDetail || "",
        },
        images: images.filter(img => img !== ""),
      };

      const result = await createBoard({
        variables: { createBoardInput },
      });
      showAlert("게시글이 성공적으로 등록되었습니다.", `/boards/${result.data.createBoard._id}`);
    } catch (error) {
      const apolloError = error as ApolloError;
      console.error(apolloError);
      showAlert(apolloError.message || "에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  const onClickUpdate = async () => {
    const myPassword = await showPrompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요");
    if (!myPassword) return;

    try {
      const updateBoardInput: UpdateBoardInput = {};
      const originalData = data?.fetchBoard;

      if (formData.title !== originalData?.title) updateBoardInput.title = formData.title;
      if (formData.contents !== originalData?.contents) updateBoardInput.contents = formData.contents;
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
      // 이미지 배열 비교 - 빈 문자열 제거 후 비교
      const filteredImages = images.filter(img => img !== "");
      const originalImages = originalData?.images?.filter(img => img !== "") || [];
      
      console.log("현재 이미지 배열:", images);
      console.log("필터링된 이미지 배열:", filteredImages);
      console.log("원본 이미지 배열:", originalData?.images);
      console.log("필터링된 원본 이미지 배열:", originalImages);
      
      if (JSON.stringify(filteredImages) !== JSON.stringify(originalImages)) {
        updateBoardInput.images = filteredImages;
        console.log("이미지 변경 감지됨, 업데이트할 이미지:", filteredImages);
      }

      // 변경사항이 있는지 확인
      if (Object.keys(updateBoardInput).length === 0) {
        showAlert("변경된 내용이 없습니다.");
        return;
      }

      console.log("updateBoard API 호출 전 - updateBoardInput:", updateBoardInput);
      
      const result = await updateBoard({
        variables: {
          boardId: props.boardId as string,
          password: myPassword,
          updateBoardInput,
        },
        refetchQueries: [
          { 
            query: FetchBoardForEditDocument, 
            variables: { boardId: props.boardId as string } 
          },
          { 
            query: FETCH_BOARD_DETAIL, 
            variables: { boardId: props.boardId as string } 
          }
        ],
      });
      
      console.log("updateBoard API 호출 후 - result:", result);
      showAlert("수정 완료!", `/boards/${props.boardId}`);
    } catch (error) {
      const apolloError = error as ApolloError;
      console.error(apolloError);
      if (apolloError.graphQLErrors?.[0]?.message.includes("비밀번호가 일치하지 않습니다.")) {
        showAlert("비밀번호가 틀렸습니다.");
      } else {
        showAlert(apolloError.message);
      }
    }
  };

  const onClickCancel = () => router.push("/boards");

  return {
    router,
    data,
    loading,
    error,
    formData,
    password,
    youtubeUrl,
    boardAddress,
    images,
    setImages,
    errors,
    handleInputChange,
    onChangePassword,
    onChangeYoutubeUrl,
    onChangeBoardAddressZipcode,
    onChangeBoardAddressAddress,
    onChangeBoardAddressAddressDetail,
    onClickPostcodeSearch,
    onCompletePostcode,
    onClosePostcodeModal,
    isPostcodeModalOpen,
    isFormValid,
    modalState,
    handleCloseModal,
    handlePromptConfirm,
    handlePromptCancel,
    onChangePromptInput,
    onClickSubmit,
    onClickUpdate,
    onClickCancel,
    uploadFile,
  };
}