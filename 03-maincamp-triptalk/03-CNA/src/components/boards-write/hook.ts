import { useState, ChangeEvent, MouseEvent } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import {
  CreateBoardDocument,
  UpdateBoardDocument,
  FetchBoardDetailDocument,
  UpdateBoardMutationVariables,
} from "@/commons/graphql/graphql";
import { BoardsWriteProps } from "./types";

export function useBoardsWrite(props: BoardsWriteProps) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const [createBoard, { loading }] = useMutation(CreateBoardDocument);
  const [updateBoard] = useMutation(UpdateBoardDocument);

  const isSubmitDisabled =
    !props.isEdit && (!name || !password || !title || !content || loading);

  const router = useRouter();

  const onChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const onClickSignup = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // 신규 게시글 작성시
    if (!props.isEdit) {
      setNameError("");
      setPasswordError("");
      setTitleError("");
      setContentError("");

      let valid = true;
      if (!name.trim()) {
        setNameError("필수입력 사항입니다.");
        valid = false;
      }
      if (!password.trim()) {
        setPasswordError("필수입력 사항입니다.");
        valid = false;
      }
      if (!title.trim()) {
        setTitleError("필수입력 사항입니다.");
        valid = false;
      }
      if (!content.trim()) {
        setContentError("필수입력 사항입니다.");
        valid = false;
      }

      if (!valid) return;

      try {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: name,
              password,
              title,
              contents: content,
            },
          },
        });

        const boardId = data?.createBoard?._id;
        if (boardId) {
          alert("게시글 등록 완료! 등록한 게시글로 이동합니다.");
          router.push(`/boards/${boardId}`);
        }
      } catch (e: any) {
        alert(e?.message ?? "에러가 발생하였습니다. 다시 시도해 주세요.");
      }
    }

    // 게시글 수정시
    else if (props.isEdit) {
      const 입력받은비밀번호 = prompt(
        "글을 작성할 때 입력했던 비밀번호를 입력해주세요."
      );
      if (!입력받은비밀번호) return;

      const updateBoardInput: Partial<
        UpdateBoardMutationVariables["updateBoardInput"]
      > = {};

      if (title && title !== props.data?.fetchBoard?.title) {
    updateBoardInput.title = title;
  }

  if (content && content !== props.data?.fetchBoard?.contents) {
    updateBoardInput.contents = content;
  }

      if (Object.keys(updateBoardInput).length === 0) {
        alert("수정된 내용이 없습니다.");
        return;
      }

      try {
        await updateBoard({
          variables: {
            boardId: props.boardId,
            password: 입력받은비밀번호,
            updateBoardInput,
          },
          refetchQueries: [
            {
              query: FetchBoardDetailDocument,
              variables: { boardId: props.boardId },
            },
          ],
          awaitRefetchQueries: true,
        });
        alert("수정 완료! 수정한 게시글로 이동합니다.");
        router.push(`/boards/${props.boardId}`);
      } catch (error: any) {
        if (error?.graphQLErrors?.length) {
          alert(error.graphQLErrors.map((e: any) => e.message).join("\n"));
        } else {
          alert("수정에 실패했습니다. 다시 시도해 주세요.");
        }
      }
    }
  };
  return {
    nameError,
    passwordError,
    titleError,
    contentError,
    isSubmitDisabled,
    onChangeName,
    onChangePassword,
    onChangeTitle,
    onChangeContent,
    onClickSignup,
  };
}
