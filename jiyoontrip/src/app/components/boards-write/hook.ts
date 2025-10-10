"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
  UploadFileDocument,
} from "@/commons/graphql/graphql";
import { Modal } from "antd";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { checkValidationFile } from "@/app/commons/libraries/file-validaton";
import { useForm } from "react-hook-form";
import { ISchema, schema } from "./schema";

export default function useBoardWrite() {
  const router = useRouter();
  const params = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });
  const [uploadFile] = useMutation(UploadFileDocument);
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const { register, handleSubmit, setValue, reset, watch, formState } = useForm({
    defaultValues: {
      writer: "",
      password: "",
      title: "",
      contents: "",

      boardAddress: {
        zipcode: "",
        address: "",
        addressDetail: "",
      },
      youtubeUrl: "", //
      images: ["", "", ""],
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [newParams, setNewParams] = useState("");

  const images = watch("images");

  const onChangeFile =
    (index: number) => async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const isValid = checkValidationFile(file);
      if (!isValid) return;

      const result = await uploadFile({
        variables: { file },
      });

      const url = result.data?.uploadFile.url ?? "";

      const currentUrls = watch("images") ?? [];
      const newUrls = [...currentUrls];
      newUrls[index] = url;

      setValue("images", newUrls);
    };
  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const onCompleteAddress = (data: Address) => {
    setValue("boardAddress.zipcode", data.zonecode);
    setValue("boardAddress.address", data.address);
    setIsModalOpen((prev) => !prev);
  };

  const onClickSignup = async (formData: ISchema) => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: formData.writer,
            password: formData.password,
            title: formData.title,
            contents: formData.contents,
            youtubeUrl: formData.youtubeUrl,
            images: formData.images,
            boardAddress: {
              zipcode: formData.zipcode,
              address: formData.address,
              addressDetail: formData.addressDetail,
            },
          },
        },
      });
      setNewParams(result.data?.createBoard._id ?? "");
      setIsCompleteModalOpen(true);
    } catch (error) {
      alert(error);
    } finally {
    }
  };

  const onClickUpdate = async (formData: ISchema) => {
    try {
      const passwordPrmpt = prompt("글을 작성할때 입력하셨던 비밀번호를 입력해주세요");
      // || (OR) 연산자는 첫 번째 값이 'falsy' (거짓 같은 값, 예: "", 0, null, undefined)일 때 뒤의 값을 반환하는 특징을 가지고 있어요.
      // title이 빈 문자열("")이면 falsy로 간주되므로, data?.fetchBoard.title이 updateTitle에 할당됩니다.
      // 반면, title에 값이 있다면 첫 번째 값인 title이 바로 반환됩니다.

      const updateTite = formData.title || data?.fetchBoard.title;
      const updateContent = formData.contents || data?.fetchBoard.contents;
      const updateZipcode = formData.zipcode || data?.fetchBoard.boardAddress?.zipcode;
      const updateAddress = formData.address || data?.fetchBoard.boardAddress?.address;
      const updateAddressDetail =
        formData.addressDetail || data?.fetchBoard.boardAddress?.addressDetail;
      const updateYoutubeUrl = formData.youtubeUrl || data?.fetchBoard.youtubeUrl;
      const updateImageUrls = formData.images;
      // .map(
      //   (el, index) => el || data?.fetchBoard.images?.[index] || ""
      // );
      const result = await updateBoard({
        variables: {
          updateBoardInput: {
            title: updateTite,
            contents: updateContent,
            boardAddress: {
              zipcode: updateZipcode,
              address: updateAddress,
              addressDetail: updateAddressDetail,
            },
            youtubeUrl: updateYoutubeUrl,
            images: updateImageUrls,
          },
          password: passwordPrmpt,
          boardId: String(params.boardId),
        },
        refetchQueries: [
          { query: FetchBoardDocument, variables: { boardId: String(params.boardId) } },
        ],
      });
      setNewParams(result.data?.updateBoard._id ?? "");
      setIsCompleteModalOpen(true);
    } catch (error) {
      alert(error);
    } finally {
    }
  };
  const onToggleCompleteModal = () => {
    setIsCompleteModalOpen((prev) => !prev);
  };
  const onSubmitModal = () => {
    router.push(`/boards/${newParams}`);
  };
  const onClickDeleteImage = (index: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    const currentUrls = watch("images") ?? [];
    const newUrls = [...currentUrls];
    newUrls[index] = "";
    setValue("images", newUrls);
  };

  useEffect(() => {
    if (data?.fetchBoard) {
      reset({
        writer: data.fetchBoard.writer ?? "",
        title: data.fetchBoard.title ?? "",
        contents: data.fetchBoard.contents,
        boardAddress: {
          zipcode: data.fetchBoard.boardAddress?.zipcode ?? "",
          address: data.fetchBoard.boardAddress?.address ?? "",
          addressDetail: data.fetchBoard.boardAddress?.addressDetail ?? "",
        },
        images: data.fetchBoard.images ?? ["", "", ""],
        youtubeUrl: data.fetchBoard.youtubeUrl ?? "",
      });
    }
  }, [data, reset]);
  return {
    register,
    handleSubmit,
    images,
    formState,
    onClickSignup,
    onClickUpdate,
    onClickDeleteImage,
    onToggleModal,
    onSubmitModal,
    onToggleCompleteModal,
    onCompleteAddress,
    onChangeFile,
    DaumPostcodeEmbed,
    Modal,
    isModalOpen,
    isCompleteModalOpen,
  };
}
