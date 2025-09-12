"use client";

import { useState } from "react";

import { useMutation } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { FETCH_BOARD, graphql_setting, UPDATE_BOARD } from "./queries";

export default function useBoardWrite() {
  const router = useRouter();
  const 내주소변수 = useParams();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [create_request_api_] = useMutation(graphql_setting);
  const [update_request_api_] = useMutation(UPDATE_BOARD);
  //   const { data } = useQuery(FETCH_BOARD, {
  //     variables: { boardId: String(내주소변수.boardId) },
  //   });

  const onClickSubmit = async () => {
    try {
      const result = await create_request_api_({
        variables: {
          createBoardInput: {
            writer: name,
            password: password,
            title: title,
            contents: contents,
          },
        },
      });

      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      alert(error);
    } finally {
    }
  };
  const onClickUpdate = async () => {
    try {
      const 입력받은비밀번호 = prompt(
        "글을 입력할때 입력하셨던 비밀번호를 입력해주세요"
      );
      if (!입력받은비밀번호) {
        alert("비밀번호를 입력해야 수정할 수 있습니다.");
        return;
      }
      setPassword(입력받은비밀번호);
      const updateBoardInput: any = {};
      if (title) updateBoardInput.title = title;
      if (contents) updateBoardInput.contents = contents;

      const myvariables = {
        updateBoardInput,
        boardId: 내주소변수.boardId,
        password: 입력받은비밀번호,
      };

      const result = await update_request_api_({
        variables: myvariables,
        refetchQueries: [
          {
            query: FETCH_BOARD,
            variables: { boardId: 내주소변수.boardId },
          },
        ],
      });
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error) {
      alert(error);
    }
  };

  const 작성자입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 작성자이름 = event.target.value;
    setName(작성자이름);
  };

  const 비밀번호입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 비밀번호 = event.target.value;
    setPassword(비밀번호);
  };

  const 제목입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 제목 = event.target.value;
    setTitle(제목);
  };

  const 내용입력기능 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const 내용 = event.target.value;
    setContents(내용);
  };

  return {
    onClickSubmit,
    onClickUpdate,
    작성자입력기능,
    비밀번호입력기능,
    제목입력기능,
    내용입력기능,
  };
}
