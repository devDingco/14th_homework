"use client";
import React, { ChangeEvent, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useMutation, gql, useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import {
  FETCH_BOARD,
  나의그래프큐엘셋팅,
  UPDATE_BOARD,
} from "components/queries";
import addImage from "@assets/add_image.png";

const IMAGE_SRC = {
  addImage: {
    src: addImage,
    alt: "사진추가이미지",
  },
};

interface IBoardWriteProps {
  isEdit: boolean; // boolean은 isEdit이라는 항목에 들어갈 수 있는 값의 종류(타입)를 지정하는 규칙 true 또는 false 
}

export default function BoardWritePage(props: IBoardWriteProps) {
  const router = useRouter();
  const params = useParams();
  const editId = props.isEdit ? params.boardId : null;

  //그래프큐엘 셋팅
  const [createBoard] = useMutation(나의그래프큐엘셋팅);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  // 수정하는 경우, 수정을 위한 초기값 보여주기
  const { data } = useQuery(FETCH_BOARD, {
    variables: { boardId: editId },
    skip: !props.isEdit,
  });

  // 작성자 변경 불가
  const [name, setName] = useState("");
  // 비밀번호 수정 불가
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState(
    props.isEdit ? data?.fetchBoard?.title : ""
  );
  const [content, setContent] = useState(
    props.isEdit ? data?.fetchBoard?.contents : ""
  );

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  // 값이 없는 경우, 버튼 비활성화
  const isButtonDisabled = !name || !password || !title || !content;

  // 변경값 상태관리
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

  const onClickSignup = async () => {
    //새글 등록하기일 경우
    if (props.isEdit === false) {
      let hasError = false;

      if (name.trim() === "") {
        setNameError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setNameError("");
      }

      if (password.length === 0) {
        setPasswordError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setPasswordError("");
      }

      if (title.trim() === "") {
        setTitleError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setTitleError("");
      }

      if (content.trim() === "") {
        setContentError("필수입력 사항입니다.");
        hasError = true;
      } else {
        setContentError("");
      }

      if (!hasError) {
        const { data } = await createBoard({
          variables: {
            createBoardInput: {
              writer: name,
              password: password,
              title: title,
              contents: content,
              youtubeUrl: "",
              boardAddress: {
                zipcode: "",
                address: "",
                addressDetail: "",
              },
              images: ["", ""],
            },
          },
        });

        console.log("data", data);
        alert("게시글이 등록되었습니다!");
        // 해당글의 상세페이지로 이동하기
        router.push(`/boards/${data.createBoard._id}`);
      }
    }

    // 기존의 글을 수정하는 경우
    else if (props.isEdit === true) {
      // 입력값이 비어있는 경우 수정 진행 불가
      if (content.trim() === "" && title.trim() === "") {
        setContentError("필수입력 사항입니다.");
        setTitleError("필수입력 사항입니다.");
        return;
      }
      if (content.trim() === "") {
        setContentError("필수입력 사항입니다.");
        return;
      }
      if (title.trim() === "") {
        setTitleError("필수입력 사항입니다.");
        return;
      }

      // 비밀번호 확인하기

      const 입력받은비밀번호 = prompt(
        "글을 작성할때 입력하셨던 비밀번호를 입력해주세요"
      );
      const updateInput: any = {};
      if (title.trim() && title !== data?.fetchBoard?.title) {
        updateInput.title = title;
      }

      if (content.trim() && content !== data?.fetchBoard?.contents) {
        updateInput.contents = content;
      }

      // 수정된 값이 있는 항목만 API 요청
      if (Object.keys(updateInput).length > 0) {
        console.log("수정된 항목만 날아가고있나? ::: updateInput", updateInput);
        try {
          const result = await updateBoard({
            variables: {
              updateBoardInput: updateInput,
              password: 입력받은비밀번호,
              boardId: editId,
            },
          });

          if (result.data) {
            console.log("기존의 글을 수정하는 경우:::", result);
            alert("게시글이 성공적으로 수정되었습니다!");
          } else {
            alert("수정에 실패했습니다.");
          }
          // 수정이 완료되면 상세 화면으로 이동하기
          router.push(`/boards/${editId}`);
        } catch (error) {
          // 에러 발생 시 처리
          if (error.graphQLErrors) {
            const errorMessages = error.graphQLErrors.map((err) => err.message);
            alert(errorMessages.join(", "));
          } else {
            console.error("네트워크에러 발생");
          }
        }
      } else {
        alert("수정된 내용이 없습니다.");
      }
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.enroll_subject}>
        <div className={styles.enroll_subject_text}>
          {props.isEdit ? "게시물 수정" : "게시물 등록"}
        </div>
      </div>
      <div className={styles.enroll_row_container}>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_row_flex}>
            <div className={styles.flex_half}>
              <div className={styles.enroll_form_title}>
                <div>작성자 </div>
                <div className={styles.enroll_required_indicator}> *</div>
              </div>
              <input
                disabled={props.isEdit}
                defaultValue={props.isEdit ? data?.fetchBoard?.writer : name}
                type="text"
                placeholder="작성자 명을 입력해 주세요."
                className={
                  props.isEdit ? styles.disabled_input : styles.enroll_input
                }
                onChange={onChangeName}
              />
              <div className={styles.error_msg}>{nameError}</div>
            </div>
            <div className={styles.flex_half}>
              <div className={styles.enroll_form_title}>
                <div>비밀번호</div>
                <div className={styles.enroll_required_indicator}> *</div>
              </div>
              <input
                disabled={props.isEdit}
                type="password"
                placeholder="비밀번호를 입력해 주세요."
                className={
                  props.isEdit ? styles.disabled_input : styles.enroll_input
                }
                onChange={onChangePassword}
                defaultValue={props.isEdit ? "*********" : password}
              />
              <div className={styles.error_msg}>{passwordError}</div>
            </div>
          </div>
        </div>

        <div className={styles.enroll_border}></div>

        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>제목</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <input
            defaultValue={props.isEdit ? data?.fetchBoard?.title : title}
            type="text"
            className={styles.enroll_input}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
          />
          <div className={styles.error_msg}>{titleError}</div>
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>내용</div>
            <div className={styles.enroll_required_indicator}> *</div>
          </div>
          <textarea
            defaultValue={props.isEdit ? data?.fetchBoard?.contents : content}
            placeholder="내용을 입력해 주세요."
            className={`${styles.enroll_input} ${styles.enroll_textarea}`}
            onChange={onChangeContent}
          ></textarea>
          <div className={styles.error_msg}>{contentError}</div>
        </div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>주소</div>
          </div>
          <div className={styles.enroll_address_firstrow}>
            <input
              type="number"
              className={styles.zipcode_input}
              placeholder="12345"
            />
            <button className={styles.zipcode_search_button}>
              우편번호 검색
            </button>
          </div>

          <input
            placeholder="주소를 입력해주세요."
            className={styles.enroll_input}
            type="text"
          />
          <input
            placeholder="상세주소"
            className={styles.enroll_input}
            type="text"
          />
        </div>
        <div className={styles.enroll_border}></div>
        <div className={styles.enroll_row_section}>
          <div className={styles.enroll_form_title}>
            <div>유튜브 링크</div>
          </div>
          <input
            className={styles.enroll_input}
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <div className={styles.enroll_border}></div>

        <div className={styles.enroll_row_section}>
          <div>사진 첨부</div>
          <div className={styles.picture_enroll_row}>
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
            <Image src={IMAGE_SRC.addImage.src} alt="이미지추가" />
          </div>
        </div>
      </div>
      <div className={styles.enroll_button_container}>
        <button className={styles.enroll_cancel_button}>취소</button>
        <button
          className={
            !props.isEdit && isButtonDisabled
              ? `${styles.enroll_submit_button} ${styles.disabled}`
              : styles.enroll_submit_button
          }
          onClick={onClickSignup}
          disabled={!props.isEdit && isButtonDisabled}
        >
          {props.isEdit ? "수정" : "등록"}하기
        </button>
      </div>
    </div>
  );
}
