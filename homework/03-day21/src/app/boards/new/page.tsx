"use client";

import { gql, useMutation } from "@apollo/client"
import React, { ChangeEvent, MouseEvent, useState } from "react";
import styles from "./styles.module.css";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!){
    createBoard(createBoardInput:$createBoardInput){
      _id
      writer
      title
      contents
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
    }
  }

`

export default function BoardsNew() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [inputError, setInputError] = useState("");
  const [isActive, setIsActive] = useState(false);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    setIsActive(event.target.value && password && title && contents ? true : false);
  };
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setIsActive(writer && event.target.value && title && contents ? true : false);
  };
  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsActive(writer && password && event.target.value && contents ? true : false);
  };
  const onChangeContent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value);
    setIsActive(writer && password && title && event.target.value ? true : false);
  };

  const [createBoard] = useMutation(CREATE_BOARD) 

  const onClickSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
    const result = await createBoard({
      variables: {
        createBoardInput: {
          writer: writer,
          password: password,
          title: title,
          contents: contents,
          youtubeUrl: "",
          images: []
        } ,
      },
    })

    console.log(result.data.createBoard);
    if (result?.data?.createBoard) {
      setInputError("");
      alert("게시글 등록이 가능한 상태입니다!");
    } else {
      setInputError("필수입력 사항입니다.");
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.enrollSubjectText}>게시물 등록</div>

        <div className={styles.enrollRowFlex}>
          <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
              <div>작성자</div>
              <div className={styles.enrollRequiredIndicator}> *</div>
            </div>
            <input
              className={styles.enrollInput}
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              value={writer}
              onChange={onChangeWriter}
            />
            <div className={styles.inputErrorMessage}>{inputError}</div>
          </div>
          <div className={styles.flexHalf}>
            <div className={styles.enrollFormTitle}>
              <div>비밀번호</div>
              <div className={styles.enrollRequiredIndicator}>*</div>
            </div>
            <input
              className={styles.enrollInput}
              type="text"
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={onChangePassword}
            />
            <div className={styles.inputErrorMessage}>{inputError}</div>
          </div>
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
          <div className={styles.enrollFormTitle}>
            <div>제목</div>
            <div className={styles.enrollRequiredIndicator}>*</div>
          </div>
          <input
            className={styles.enrollInput}
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={onChangeTitle}
          />
          <div className={styles.inputErrorMessage}>{inputError}</div>
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
          <div className={styles.enrollFormTitle}>
            <div>내용</div>
            <div className={styles.enrollRequiredIndicator}>*</div>
          </div>
          <textarea
            className={`${styles.enrollInput} ${styles.enrollTextarea}`}
            placeholder="내용을 입력해 주세요."
            value={contents}
            onChange={onChangeContent}
          />
          <div className={styles.inputErrorMessage}>{inputError}</div>
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.enrollRowSection}>
          <div className={styles.enrollFormTitle}>
            <div>주소</div>
          </div>
          <div className={styles.enrollAddressFirstrow}>
            <input className={styles.zipcodeInput} type="number" placeholder="01234" />
            <button className={styles.zipcodeSearchButton}>우편번호 검색</button>
          </div>
          <input className={styles.enrollInput} type="text" placeholder="주소를 입력해 주세요." />
          <input className={styles.enrollInput} type="text" placeholder="상세주소" />
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
          <div className={styles.enrollFormTitle}>
            <div>유튜브 링크</div>
          </div>
          <input className={styles.enrollInput} type="text" placeholder="링크를 입력해 주세요." />
        </div>

        <hr className={styles.enrollBorder} />

        <div className={styles.flexHalf}>
          <div className={styles.enrollFormTitle}>
            <div>사진 첨부</div>
          </div>
          <div className={styles.pictureEnrollRow}>
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className={styles.pictureEnrollButton}>
                <img className={styles.iconImage} src="/images/add_icon.png" alt="추가아이콘" />
                <div className={styles.pictureEnrollButtonText}>클릭해서 사진 업로드</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.enrollButtonContainer}>
          <button className={styles.enrollCancelButton}>취소</button>
          <button
            className={`${styles.enrollSubmitButton} ${isActive ? styles.active : styles.disabled}`}
            onClick={onClickSubmit}
          >
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}
