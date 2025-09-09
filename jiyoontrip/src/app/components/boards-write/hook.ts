"use client";

import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { CREAT_BOARD, FETCH_BOARD, UPDATE_BOARD } from "./queires";

export default function useBoardWrite() {
  const router = useRouter();
  const params = useParams();
  const [createBoard] = useMutation(CREAT_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
  const { data } = useQuery(FETCH_BOARD, {
    variables: {
      boardId: String(params.boardId),
    },
  });
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
              youtubeUrl: "",
              images: [],
              boardAddress: {
                zipcode: "",
                address: "",
                addressDetail: "",
              },
            },
          },
        });
        console.log(result);
        console.log(result.data.createBoard._id);
        alert("게시글을 등록하였습니다!");
        router.push(`/boards/${result.data.createBoard._id}`);
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
      const updateTite = title !== "" ? title : data?.fetchBoard.title;
      const updateContent = content !== "" ? content : data?.fetchBoard.contents;
      const result = await updateBoard({
        variables: {
          updateBoardInput: {
            title: updateTite,
            contents: updateContent,
            youtubeUrl: "",
            images: [],
          },
          password: passwordPrmpt,
          boardId: String(params.boardId),
        },
        refetchQueries: [
          { query: FETCH_BOARD, variables: { boardId: String(params.boardId) } },
        ],
      });
      alert("게시글을 수정하였습니다!");
      router.push(`/boards/${result.data.updateBoard._id}`);
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
    onClickSignup,
    onClickUpdate,
    authorError,
    passwordError,
    titleError,
    contentError,
    isActive,
  };
}
