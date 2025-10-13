"use client";

import { useState, ChangeEvent, MouseEvent } from "react";
import styles from "./styles.module.css";
import addIcon from "@/assets/icons/add.svg";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

const UPDATE_BOARD = gql`
  mutation updateBoard(
    $boardId: ID!
    $password: String!
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
    }
  }
`;

export default function BoardsComponentWrite(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const [createBoard, { loading }] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);
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
      event.preventDefault();

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

      const updateBoardInput: any = {
        ...(title && title !== props.data?.fetchBoard?.title && { title }),
        ...(content &&
          content !== props.data?.fetchBoard?.contents && {
            contents: content,
          }),
      };

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

  return (
    <div className={styles.container}>
      <form className={styles.postForm}>
        <h1 className={styles.pageTitle}>
          게시물 {props.isEdit ? "수정" : "등록"}
        </h1>
        {/* 작성자와 비밀번호 */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              작성자
            </label>
            <input
              type="text"
              className={styles.formInput}
              placeholder="작성자 명을 입력해 주세요."
              onChange={onChangeName}
              disabled={props.isEdit}
              defaultValue={
                props.isEdit ? props.data?.fetchBoard?.writer ?? "" : ""
              }
            />
            <div className={styles.errorMsg}>{nameError}</div>
          </div>
          <div className={styles.formGroup}>
            <label className={`${styles.formLabel} ${styles.required}`}>
              비밀번호
            </label>
            <input
              type="password"
              className={styles.formInput}
              placeholder="비밀번호를 입력해 주세요."
              onChange={onChangePassword}
              disabled={props.isEdit}
              defaultValue={props.isEdit ? "*********" : password}
            />
            <div className={styles.errorMsg}>{passwordError}</div>
          </div>
        </div>

        <hr className={styles.formDivider} />

        {/* 제목 */}
        <div className={styles.formGroup}>
          <label className={`${styles.formLabel} ${styles.required}`}>
            제목
          </label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="제목을 입력해 주세요."
            onChange={onChangeTitle}
            defaultValue={
              props.isEdit ? props.data?.fetchBoard?.title ?? "" : ""
            }
          />
          <div className={styles.errorMsg}>{titleError}</div>
        </div>

        <hr className={styles.formDivider} />

        {/* 내용 */}
        <div className={styles.formGroup}>
          <label className={`${styles.formLabel} required`}>내용</label>
          <textarea
            className={styles.formTextarea}
            placeholder="내용을 입력해 주세요."
            onChange={onChangeContent}
            defaultValue={
              props.isEdit ? props.data?.fetchBoard?.contents ?? "" : ""
            }
          ></textarea>
          <div className={styles.errorMsg}>{contentError}</div>
        </div>

        {/* 주소 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>주소</label>
          <div className={styles.addressRow}>
            <input
              type="text"
              className={`${styles.formInput} ${styles.postcodeInput}`}
              placeholder="01234"
            />
            <button type="button" className={styles.postcodeBtn}>
              우편번호 검색
            </button>
          </div>
          <input
            type="text"
            className={styles.formInput}
            placeholder="주소를 입력해 주세요."
          />
          <input
            type="text"
            className={styles.formInput}
            placeholder="상세주소"
          />
        </div>

        <hr className={styles.formDivider} />

        {/* 유튜브 링크 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>유튜브 링크</label>
          <input
            type="text"
            className={styles.formInput}
            placeholder="링크를 입력해 주세요."
          />
        </div>

        <hr className={styles.formDivider} />

        {/* 사진 첨부 */}
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>사진 첨부</label>
          <div className={styles.photoUploadContainer}>
            <div className={styles.photoUploadBox}>
              <img src={addIcon.src} alt="추가" className={styles.uploadIcon} />
              <div className={styles.uploadText}>클릭해서 사진 업로드</div>
            </div>
            <div className={styles.photoUploadBox}>
              <img src={addIcon.src} alt="추가" className={styles.uploadIcon} />
              <div className={styles.uploadText}>클릭해서 사진 업로드</div>
            </div>
            <div className={styles.photoUploadBox}>
              <img src={addIcon.src} alt="추가" className={styles.uploadIcon} />
              <div className={styles.uploadText}>클릭해서 사진 업로드</div>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className={styles.formActions}>
          <button type="button" className={styles.cancelBtn}>
            취소
          </button>
          <button
            type="submit"
            className={isSubmitDisabled ? styles.disabled : styles.submitBtn}
            onClick={onClickSignup}
            disabled={isSubmitDisabled}
          >
            {props.isEdit ? "수정" : "등록"}하기
          </button>
        </div>
      </form>
    </div>
  );
}
