"use client";
import styles from "./styles.module.css";
import { useState } from "react";
import Image from "next/image";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";

const graphql_setting = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;
const FETCH_BOARD = gql`
  query fetchBoard($boardId: ID!) {
    fetchBoard(boardId: $boardId) {
      _id
      writer
      title
      contents
    }
  }
`;
const UPDATE_BOARD = gql`
  mutation updateBoard(
    $updateBoardInput: UpdateBoardInput!
    $password: String
    $boardId: ID!
  ) {
    updateBoard(
      updateBoardInput: $updateBoardInput
      password: $password
      boardId: $boardId
    ) {
      _id
      writer
      title
      contents
    }
  }
`;

export default function BoardWrite(props) {
  const router = useRouter();
  const 내주소변수 = useParams();
  const 사진경로 = "/images/add_image.png";
  const 아스타기호 = "/images/_.png";

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [create_request_api_] = useMutation(graphql_setting);
  const [update_request_api_] = useMutation(UPDATE_BOARD);
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: String(내주소변수.boardId) },
  });

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
      alert("에러가 발생하였습니다. 다시 시도해 주세요.");
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
      //   (document.getElementById("작성자") as HTMLButtonElement).disabled = true;
      //   (document.getElementById("비밀번호") as HTMLButtonElement).disabled =
      //     true;
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error) {
      alert(error);
    }
  };

  const 작성자입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 작성자이름 = event.target.value;
    setName(작성자이름);

    // if (작성자이름 && password && title && contents) {
    //   (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled =
    //     false;
    //   (
    //     document.getElementById("등록버튼ID") as HTMLButtonElement
    //   ).style.cssText = "background: #2974E5; color: #FFF;";
    // } else {
    //   (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled =
    //     true;
    //   (
    //     document.getElementById("등록버튼ID") as HTMLButtonElement
    //   ).style.cssText = " background : var(--gray-300, #C7C7C7); color:white";
    // }
  };

  const 비밀번호입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 비밀번호 = event.target.value;
    setPassword(비밀번호);

    // if (name && 비밀번호 && title && contents) {
    //   (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled =
    //     false;
    //   (
    //     document.getElementById("등록버튼ID") as HTMLButtonElement
    //   ).style.cssText = "background: #2974E5; color: #FFF;";
    // } else {
    //   (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled =
    //     true;
    //   (
    //     document.getElementById("등록버튼ID") as HTMLButtonElement
    //   ).style.cssText = " background : var(--gray-300, #C7C7C7); color:white";
    // }
  };

  const 제목입력기능 = (event: React.ChangeEvent<HTMLInputElement>) => {
    const 제목 = event.target.value;
    setTitle(제목);

    // if (name && password && 제목 && contents) {
    //   (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled =
    //     false;
    //   (
    //     document.getElementById("등록버튼ID") as HTMLButtonElement
    //   ).style.cssText = "background: #2974E5; color: #FFF;";
    // } else {
    //   (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled =
    //     true;
    //   (
    //     document.getElementById("등록버튼ID") as HTMLButtonElement
    //   ).style.cssText = " background : var(--gray-300, #C7C7C7); color:white";
    // }
  };

  const 내용입력기능 = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const 내용 = event.target.value;
    setContents(내용);

    // if (name && password && title && 내용) {
    //   (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled =
    //     false;
    //   (
    //     document.getElementById("등록버튼ID") as HTMLButtonElement
    //   ).style.cssText = "background: #2974E5; color: #FFF;";
    // } else {
    //   (document.getElementById("등록버튼ID") as HTMLButtonElement).disabled =
    //     true;
    //   (
    //     document.getElementById("등록버튼ID") as HTMLButtonElement
    //   ).style.cssText = " background : var(--gray-300, #C7C7C7); color:white";
    // }
  };

  return (
    <>
      <div className={styles.게시물등록영역}>
        <div className={styles.게시물_등록}>게시물 등록</div>
        <div className={styles.작성자_비밀번호_영역}>
          <div>
            <span>작성자</span>
            <Image
              src={아스타기호}
              alt="아스타기호"
              width={8}
              height={8}
              sizes="100vw"
            />

            <input
              id="작성자"
              className={props.수정_등록 ? styles.작성자_비활성 : styles.작성자}
              type="text"
              onChange={작성자입력기능}
              placeholder="작성자 명을 입력해 주세요."
              value={name || data?.fetchBoard.writer || ""}
            />
          </div>
          <div>
            <span>비밀번호</span>
            <img src={아스타기호} />
            <input
              id="비밀번호"
              className={
                props.수정_등록 ? styles.비밀번호_비활성 : styles.비밀번호
              }
              type="password"
              value={password}
              onChange={비밀번호입력기능}
              placeholder="비밀번호를 입력해 주세요."
            />
          </div>
        </div>
        <div className={styles.제목등록영역}>
          <span>제목</span>
          <img src={아스타기호} />
          <input
            type="text"
            onChange={제목입력기능}
            placeholder="제목을 입력해 주세요."
            value={title || data?.fetchBoard.title || ""}
          />
        </div>
        <div className={styles.내용_주소_등록영역}>
          <div className="내용영역">
            <span>내용</span>
            <img src={아스타기호} />
            <textarea
              value={contents || data?.fetchBoard.contents || ""}
              onChange={내용입력기능}
              placeholder="내용을 입력해 주세요."
            />
          </div>
          <div className={styles.주소영역}>
            <div>주소</div>
            <div className={styles.우편번호}>
              <div className={styles.우편번호노출영역}></div>
              <button className={styles.우편번호검색버튼}>우편번호검색</button>
            </div>
            <div className={styles.주소노출영역}></div>
            <input
              className={styles.상세주소입력영역}
              type="text"
              placeholder="상세주소"
            />
          </div>
        </div>
        <div className={styles.유튜브링크_첨부영역}>
          <div>유튜브 링크</div>
          <input type="text" placeholder="링크를 입력해 주세요." />
        </div>
        <div className={styles.사진첨부영역}>
          <div>사진첨부</div>
          <div className={styles.사진첨부버튼}>
            <img src={사진경로} />
            <img src={사진경로} />
            <img src={사진경로} />
          </div>
        </div>
        <div className={styles.버튼영역}>
          <button className={styles.취소버튼}>취소</button>
          <button
            id="등록버튼ID"
            className={styles.등록버튼}
            onClick={props.수정_등록 ? onClickUpdate : onClickSubmit}
          >
            {props.수정_등록 ? "수정" : "등록"}하기
          </button>
        </div>
      </div>
    </>
  );
}
