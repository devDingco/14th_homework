import { ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  CreateBoardDocument,
  FetchBoardDocument,
  UpdateBoardDocument,
} from "../../commons/gql/graphql";
import { getNamedMiddlewareRegex } from "next/dist/shared/lib/router/utils/route-regex";

export const useBoardsComponentWrite = (isEdit: boolean) => {
  // - 변경되는 입력값 새로 저장하는 상태 설정
  const router = useRouter();
  const params = useParams();
  const editId = isEdit ? params.boardId.toString() : ""; //-> 현재가 '수정 모드'라면, editId에 게시글 ID(params.boardId)를 넣고, 아니라면 빈칸을 넣는다

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [게시글등록API요청함수] = useMutation(CreateBoardDocument);
  const [게시글업데이트요청함수] = useMutation(UpdateBoardDocument);

  const { data } = useQuery(FetchBoardDocument, {
    variables: { boardId: editId.toString() },
    skip: !isEdit,
  });

  const 등록버튼비활성화 = !writer || !password || !title || !contents;
  // const 수정버튼비활성화 = !title || !contents;
  // - 변경되는 입력값 확인후 상태에 저장하기
  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
  };

  const onClickSignup = async () => {
    try {
      const result = await 게시글등록API요청함수({
        //여기서 result는 mutation 실행 후 반환된 "변경 결과"
        variables: {
          createBoardInput: { writer, password, title, contents },
        },
      });
      alert("등록이 완료되었습니다.");
      router.push(`/boards/${result.data?.createBoard._id}`);
    } catch (error) {
      alert("에러가 발생하였습니다. 다시 시도해 주세요.");
    } // finally {
    // }
  };

  const onClickEdit = async () => {
    const passwordInput = prompt(
      "글을 입력할때 입력하셨던 비밀번호를 입력해주세요"
    );
    if (!passwordInput) {
      alert("비밀번호 입력이 잘못되었습니다");
    }

    const updateInput: any = {};
    // if (writer && writer.trim() !== "") updateInput.writer = writer;
    if (title && title.trim() !== "") updateInput.title = title;
    if (contents && contents.trim() !== "") updateInput.contents = contents;

    if (Object.keys(updateInput).length > 0) {
      //->객체의 key(속성 이름)들을 배열로 반환하고 객체에 몇개의 속성이 있는지 말해줌
      try {
        const result = await 게시글업데이트요청함수({
          variables: {
            updateBoardInput: updateInput,
            password: passwordInput,
            boardId: editId,
          },
        });

        if (result.data) {
          alert("수정이 완료되었습니다.");
        } else {
          alert("수정이 실패했습니다.");
        }

        router.push(`/boards/${editId}`);
      } catch (error) {
        alert("에러가 발생하였습니다. 다시 시도해 주세요.");
      }
    }
  };

  return {
    data,
    writer,
    password,
    title,
    contents,
    onChangeWriter,
    onChangeTitle,
    onChangePassword,
    onChangeContents, // shorthand-property
    onClickSignup,
    onClickEdit,
    등록버튼비활성화,
  };
};
