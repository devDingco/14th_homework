"use client";

import styles from "./styles.module.css";
import { SmallInput, LongInput, SuperLongInput } from "./form-input";
import Divider from "./line";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const CREATE_BOARD = gql`
  mutation createBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
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
    $boardId: ID!
    $password: String
    $updateBoardInput: UpdateBoardInput!
  ) {
    updateBoard(
      boardId: $boardId
      password: $password
      updateBoardInput: $updateBoardInput
    ) {
      _id
      title
      contents
      writer
    }
  }
`;

export default function BoardsNew(props: {
  isEdit: boolean;
  boardId?: string;
}) {
  const router = useRouter();
  const params = useParams();

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [writerError, setWriterError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const [isActive, setIsActive] = useState(false);

  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  const { data } = useQuery(FETCH_BOARD, {
    skip: !props.isEdit,
    variables: { boardId: props.boardId },
  });

  useEffect(() => {
    if (props.isEdit && data?.fetchBoard) {
      setWriter(data.fetchBoard.writer);
      setTitle(data.fetchBoard.title);
      setContent(data.fetchBoard.contents);
    }
  }, [data, props.isEdit]);

  useEffect(() => {
    if (!props.isEdit) {
      if (writer && password && title && content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } else {
      if (title && content) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    }
  }, [writer, password, title, content, props.isEdit]);

  const onChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value);
    if (writerError) setWriterError("");
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    if (passwordError) setPasswordError("");
  };

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (titleError) setTitleError("");
  };

  const onChangeContent = (event: ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
    if (contentError) setContentError("");
  };

  const onClickSubmit = async () => {
    let hasError = false;

    if (!writer.trim()) {
      setWriterError("필수입력 사항입니다.");
      hasError = true;
    }
    if (!password.trim()) {
      setPasswordError("필수입력 사항입니다.");
      hasError = true;
    }
    if (!title.trim()) {
      setTitleError("필수입력 사항입니다.");
      hasError = true;
    }
    if (!content.trim()) {
      setContentError("필수입력 사항입니다.");
      hasError = true;
    }

    if (hasError) return;

    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer,
            password,
            title,
            contents: content,
          },
        },
      });

      router.push(`/boards/${result.data.createBoard._id}`);
      alert("게시글이 성공적으로 등록되었습니다!");
    } catch (error) {
      console.error(error);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  const onClickUpdate = async () => {
    if (!props.boardId) return;

    const inputPassword = prompt("글 작성 시 입력했던 비밀번호를 입력해주세요");
    if (!inputPassword) {
      alert("비밀번호를 입력해야 수정할 수 있습니다.");
      return;
    }

    try {
      const result = await updateBoard({
        variables: {
          boardId: props.boardId,
          password: inputPassword,
          updateBoardInput: {
            ...(title && { title }),
            ...(content && { contents: content }),
          },
        },
      });

      router.push(`/boards/${result.data.updateBoard._id}`);
      alert("게시글이 성공적으로 수정되었습니다!");
    } catch (error: any) {
      console.error(error);
      if (error.graphQLErrors?.[0]?.message.includes("password")) {
        alert("비밀번호가 틀렸습니다.");
      } else {
        alert("게시글 수정에 실패했습니다.");
      }
    }
  };

  return (
    <div className={styles.App}>
      <header>
        <div className={styles.전체}>
          <div className={styles.헤더}></div>
          <div className={styles.바디}>
            <div className={styles.게시글_폼_제목}>
              {props.isEdit ? "게시글 수정" : "게시글 등록"}
            </div>
            <div className={styles.게시글_폼}>
              <div className={styles.게시글_폼_상세}>
                {/* 작성자 & 비밀번호 */}
                <div className={styles.게시글_인풋블록}>
                  <SmallInput
                    Input_Title="작성자"
                    Input_Placeholder="작성자 명을 입력해주세요."
                    Input_Star="*"
                    value={writer}
                    onChange={onChangeWriter}
                    errorMessage={writerError}
                    disabled={props.isEdit}
                  />
                  <SmallInput
                    Input_Title="비밀번호"
                    Input_Placeholder="비밀번호를 입력해주세요."
                    Input_Star="*"
                    value={password}
                    onChange={onChangePassword}
                    errorMessage={passwordError}
                    disabled={props.isEdit}
                  />
                </div>
                <Divider />

                {/* 제목 */}
                <div className={styles.게시글_인풋블록}>
                  <LongInput
                    Input_Title="제목"
                    Input_Placeholder="제목을 입력해 주세요."
                    Input_Star="*"
                    value={title}
                    onChange={onChangeTitle}
                    errorMessage={titleError}
                  />
                </div>
                <Divider />

                {/* 내용 */}
                <div className={styles.게시글_인풋블록}>
                  <SuperLongInput
                    Input_Title="내용"
                    Input_Placeholder="내용을 입력해 주세요."
                    Input_Star="*"
                    value={content}
                    onChange={onChangeContent}
                    errorMessage={contentError}
                  />
                </div>

                {/* 주소 */}
                <div className={styles.게시글_인풋블록쌓기}>
                  <div className={styles.주소인풋이랑버튼}>
                    주소
                    <div className={styles.인풋이랑버튼}>
                      <input
                        className={styles.우편번호인풋}
                        placeholder="01234"
                      />
                      <button className={styles.우편번호검색}>
                        우편번호 검색
                      </button>
                    </div>
                  </div>
                  <LongInput Input_Placeholder="주소를 입력해 주세요." />
                  <LongInput Input_Placeholder="상세주소" />
                </div>
                <Divider />

                {/* 유튜브 */}
                <div className={styles.게시글_인풋블록}>
                  <LongInput
                    Input_Title="유튜브링크"
                    Input_Placeholder="링크를 입력해주세요."
                  />
                </div>
                <Divider />

                {/* 사진 첨부 */}
                <div className={styles.게시글_인풋블록쌓기}>
                  <span>사진첨부</span>
                  <div className={styles.사진첨부_그룹}>
                    <div className={styles.사진첨부}>
                      <img
                        src="/images/add.png"
                        className={styles.더하기이미지}
                        alt=""
                      />
                      클릭해서 사진 업로드
                    </div>
                    <div className={styles.사진첨부}>
                      <img
                        src="/images/add.png"
                        className={styles.더하기이미지}
                        alt=""
                      />
                      클릭해서 사진 업로드
                    </div>
                    <div className={styles.사진첨부}>
                      <img
                        src="/images/add.png"
                        className={styles.더하기이미지}
                        alt=""
                      />
                      클릭해서 사진 업로드
                    </div>
                  </div>
                </div>
              </div>

              {/* 버튼 */}
              <div className={styles.게시글_폼_버튼}>
                <button
                  className="취소"
                  onClick={() => {
                    router.push(`/boards/`);
                  }}
                >
                  취소
                </button>
                <button
                  style={{
                    backgroundColor: isActive ? "#2974E5" : "gray",
                  }}
                  className={styles.등록}
                  onClick={props.isEdit ? onClickUpdate : onClickSubmit}
                >
                  {props.isEdit ? "수정" : "등록"}하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
