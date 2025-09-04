"use client";

import styles from "./BoardsNew.module.css";
import React, { useState } from "react";
import Image from "next/image";
import addIcon from "./assets/add.svg";
import { useMutation, gql } from "@apollo/client";
import { error } from "console";
import { useRouter } from "next/navigation";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      # password
      title
      contents
      createdAt
    }
  }
`;

export default function BoardsNew() {
  // - 변경되는 입력값 새로 저장하는 상태 설정
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const 버튼비활성화 = !writer || !password || !title || !contents;
  // - 변경되는 입력값 확인후 상태에 저장하기
  const onChangeWriter: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setWriter(e.target.value);
  };

  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const onChangeTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value);
  };

  const onChangeContents: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setContents(e.target.value);
  };

  const router = useRouter();

  const [게시글등록API요청함수] = useMutation(CREATE_BOARD);

  const onClickSignup = async () => {
    try {
      const result = await 게시글등록API요청함수({
        variables: {
          createBoardInput: { writer, password, title, contents },
        },
      });

      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      alert("에러가 발생하였습니다. 다시 시도해 주세요.");
    } // finally {
    // }
  };

  //입력값에 문제가 있을 때 보여주는 에러메세지 저장하는 상태 설정
  // const [writererror, setWriterError] = useState("");
  // const [passworderror, setPasswordError] = useState("");
  // const [titleerror, setTitleError] = useState("");
  // const [contenterror, setContentError] = useState("");

  // - 등록하기 버튼 눌렀을때 실행되는 함수
  // const onClickSignup = () => {
  //   let error = false; // -> 처음에는 경고 메세지 안떠있는 상태이기 때문에 에러상태가 아님을 지정

  //   if (writer.trim() === "") {
  //     setWriterError("필수입력 사항입니다");
  //     error = true;
  //   } else {
  //     setWriterError("");
  //   }

  //   if (password.trim() === "") {
  //     setPassword("필수입력 사항입니다");
  //     error = true;
  //   } else {
  //     setPasswordError("");
  //   }

  //   if (title.trim() === "") {
  //     setTitle("필수입력 사항입니다");
  //     error = true;
  //   } else {
  //     setTitleError("");
  //   }

  //   if (content.trim() === "") {
  //     setContentError("필수입력 사항입니다");
  //     error = true;
  //   } else {
  //     setContentError("");
  //   }

  //   // 에러가 아니라면 "게시글 등록가능" 창 뜨기
  //   if (error === false) {
  //     alert("게시글 등록이 가능한 상태입니다!");
  //   }
  // };

  // // // 내부 컴포넌트 제거하고 단일 JSX로 구성
  // // import styles from "./게시물등록.module.css";

  return (
    <div className={styles.게시물등록_frame}>
      <div className={styles.게시물등록_container}>
        <h1>게시물 등록</h1>

        <div className={styles.게시물등록_작성자and비밀번호}>
          <div className={styles.게시물등록_사용자인풋}>
            <label htmlFor="작성자" className={styles.게시물등록_라벨}>
              작성자 <span className={styles.required}>*</span>
            </label>
            <input
              id="작성자"
              className={styles.게시물등록_플레이스홀더}
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeWriter}
            />
            {/* <div className={styles.에러메세지_스타일}>{writererror}</div> */}
          </div>

          <div className={styles.게시물등록_사용자인풋}>
            <label htmlFor="비밀번호" className={styles.게시물등록_라벨}>
              비밀번호 <span style={{ color: "red" }}>*</span>
            </label>
            <input
              id="비밀번호"
              className={styles.게시물등록_플레이스홀더}
              type="text"
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
            />
            {/* <div className={styles.에러메세지_스타일}>{passworderror}</div> */}
          </div>
        </div>

        <hr />

        <div className={styles.게시물등록_사용자인풋}>
          <label htmlFor="제목" className={styles.게시물등록_라벨}>
            제목 <span style={{ color: "red" }}>*</span>
          </label>
          <input
            id="제목"
            className={styles.게시물등록_플레이스홀더}
            type="text"
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          {/* <div className={styles.에러메세지_스타일}>{titleerror}</div> */}
        </div>

        <div className={styles.게시물등록_사용자인풋}>
          <label htmlFor="내용" className={styles.게시물등록_라벨}>
            내용 <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            id="내용"
            className={styles.게시물등록_플레이스홀더_내용}
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContents}
          />
          {/* <div className={styles.에러메세지_스타일}>{contenterror}</div> */}
        </div>

        <hr />

        <div className={styles.게시물등록_주소인풋}>
          <div className={styles.게시물등록_주소_상단}>
            <label className={styles.게시물등록_주소인풋_라벨}>주소</label>
            <div className={styles.게시물등록_주소인풋_우편번호}>
              <input
                className={styles.게시물등록_주소인풋_플레이스홀더}
                type="text"
                placeholder="01234"
              />
              <button className={styles.게시물등록_주소인풋_우편번호버튼}>
                우편번호 검색
              </button>
            </div>
          </div>

          <input
            className={styles.게시물등록_플레이스홀더}
            type="text"
            placeholder="주소를 입력해 주세요."
          />
          <input
            className={styles.게시물등록_플레이스홀더}
            type="text"
            placeholder="상세주소"
          />
        </div>

        <hr />

        <div className={styles.게시물등록_사용자인풋}>
          <label htmlFor="유튜브링크" className={styles.게시물등록_라벨}>
            유튜브 링크
          </label>
          <input
            id="유튜브링크"
            className={styles.게시물등록_플레이스홀더}
            type="text"
            placeholder="링크를 입력해 주세요"
          />
        </div>

        <hr />

        <div className={styles.사진첨부인풋}>
          <label>사진첨부</label>
          <div className={styles.게시물등록_사진첨부}>
            <label>
              <div className={styles.게시물등록_사진첨부_박스}>
                <Image src={addIcon} alt={addIcon} />
                <p>클릭해서 사진 업로드</p>
                <input type="file" />
              </div>
            </label>
            <label>
              <div className={styles.게시물등록_사진첨부_박스}>
                <Image src={addIcon} alt={addIcon} />
                <p>클릭해서 사진 업로드</p>
                <input type="file" />
              </div>
            </label>
            <label>
              <div className={styles.게시물등록_사진첨부_박스}>
                <Image src={addIcon} alt={addIcon} />
                <p>클릭해서 사진 업로드</p>
                <input type="file" />
              </div>
            </label>
          </div>
        </div>

        <div className={styles.게시물등록_취소and등록하기버튼}>
          <button className={styles.취소버튼}>취소</button>
          <button
            className={styles.등록하기버튼}
            onClick={onClickSignup}
            disabled={버튼비활성화}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}

// export default BoardsNew;
