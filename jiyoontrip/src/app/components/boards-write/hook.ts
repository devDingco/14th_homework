"use client";

import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

// import { CREAT_BOARD, FETCH_BOARD, UPDATE_BOARD } from "./queires";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "@/commons/graphql/graphql";
import { Modal } from "antd";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";

export default function useBoardWrite() {
  const router = useRouter();
  const params = useParams();
  const { data } = useQuery(FetchBoardDocument, {
    variables: {
      boardId: String(params.boardId),
    },
  });
  const [createBoard] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [zonecode, setZonecode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorError, setAuthorError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [isActive, setIsActive] = useState(false);

  const onChangeAuthor = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
    if (event.target.value !== "" && password !== "" && title !== "" && content !== "") {
      setIsActive(true);
    }
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (author !== "" && event.target.value !== "" && title !== "" && content !== "") {
      setIsActive(true);
    }
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (author !== "" && password !== "" && event.target.value !== "" && content !== "") {
      setIsActive(true);
    }
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (author !== "" && password !== "" && title !== "" && event.target.value !== "") {
      setIsActive(true);
    }
  };
  const onChangeAddressDetail = (event: ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(event.target.value);
  };
  const onChnageYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const onToggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const onCompleteAddress = (data: Address) => {
    setZonecode(data.zonecode);
    setAddress(data.address);
    setIsModalOpen((prev) => !prev);
  };
  const onClickSignup = async () => {
    try {
      if (author === "") {
        setAuthorError("필수입력 사항입니다.");
      } else {
        setAuthorError("");
      }
      if (password === "") {
        setPasswordError("필수입력 사항입니다.");
      } else {
        setPasswordError("");
      }
      if (title === "") {
        setTitleError("필수입력 사항입니다.");
      } else {
        setTitleError("");
      }
      if (content === "") {
        setContentError("필수입력 사항입니다.");
      } else {
        setContentError("");
      }

      if (author !== "" && password !== "" && title !== "" && content !== "") {
        const result = await createBoard({
          variables: {
            createBoardInput: {
              writer: author,
              password: password,
              title: title,
              contents: content,
              youtubeUrl: youtubeUrl,
              images: [],
              boardAddress: {
                zipcode: zonecode,
                address: address,
                addressDetail: addressDetail,
              },
            },
          },
        });
        console.log(result);
        console.log(result.data?.createBoard._id);
        alert("게시글을 등록하였습니다!");
        router.push(`/boards/${result.data?.createBoard._id}`);
      }
    } catch (error) {
      alert(error);
    } finally {
    }
  };

  const onClickUpdate = async () => {
    try {
      // if (author === "") {
      //   setAuthorError("필수입력 사항입니다.");
      // } else {
      //   setAuthorError("");
      // }
      // if (password === "") {
      //   setPasswordError("필수입력 사항입니다.");
      // } else {
      //   setPasswordError("");
      // }
      // if (title === "") {
      //   setTitleError("필수입력 사항입니다.");
      // } else {
      //   setTitleError("");
      // }
      // if (content === "") {
      //   setContentError("필수입력 사항입니다.");
      // } else {
      //   setContentError("");
      // }

      const passwordPrmpt = prompt("글을 작성할때 입력하셨던 비밀번호를 입력해주세요");
      // || (OR) 연산자는 첫 번째 값이 'falsy' (거짓 같은 값, 예: "", 0, null, undefined)일 때 뒤의 값을 반환하는 특징을 가지고 있어요.
      // title이 빈 문자열("")이면 falsy로 간주되므로, data?.fetchBoard.title이 updateTitle에 할당됩니다.
      // 반면, title에 값이 있다면 첫 번째 값인 title이 바로 반환됩니다.

      const updateTite = title || data?.fetchBoard.title;
      const updateContent = content || data?.fetchBoard.contents;
      const updateZipcode = zonecode || data?.fetchBoard.boardAddress?.zipcode;
      const updateAddress = address || data?.fetchBoard.boardAddress?.address;
      const updateAddressDetail =
        addressDetail || data?.fetchBoard.boardAddress?.addressDetail;
      const updateYoutubeUrl = youtubeUrl || data?.fetchBoard.youtubeUrl;

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
            images: [],
          },
          password: passwordPrmpt,
          boardId: String(params.boardId),
        },
        refetchQueries: [
          { query: FetchBoardDocument, variables: { boardId: String(params.boardId) } },
        ],
      });
      alert("게시글을 수정하였습니다!");
      router.push(`/boards/${result.data?.updateBoard._id}`);
    } catch (error) {
      alert(error);
    } finally {
    }
  };

  return {
    onChangeAuthor,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onChangeAddressDetail,
    onClickSignup,
    onClickUpdate,
    onToggleModal,
    onCompleteAddress,
    onChnageYoutubeUrl,
    zonecode,
    address,
    addressDetail,
    authorError,
    passwordError,
    titleError,
    contentError,
    isActive,
    data,
    DaumPostcodeEmbed,
    Modal,
    isModalOpen,
  };
}
