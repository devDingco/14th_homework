// src/app/boards/new/page.tsx
"use client";

import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

// GraphQL 뮤테이션 정의
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

const BoardsNew = () => {
  const router = useRouter();

  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [boardAddress, setBoardAddress] = useState({
    zipcode: "",
    streetAddress: "",
    detailAddress: "",
  });
  const [images, setImages] = useState([]);

  const [errors, setErrors] = useState({
    writer: "",
    password: "",
    title: "",
    content: "",
  });

  const [createBoard] = useMutation(CREATE_BOARD);

  const isFormValid = writer && password && title && content;

  const handleSubmit = async () => {
    let hasError = false;
    const newErrors = { writer: "", password: "", title: "", content: "" };

    if (!writer) {
      newErrors.writer = "필수입력 사항입니다.";
      hasError = true;
    }
    if (!password) {
      newErrors.password = "필수입력 사항입니다.";
      hasError = true;
    }
    if (!title) {
      newErrors.title = "필수입력 사항입니다.";
      hasError = true;
    }
    if (!content) {
      newErrors.content = "필수입력 사항입니다.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    // GraphQL API로 전송할 모든 필드를 포함
    const createBoardInput = {
      writer,
      password,
      title,
      contents: content,
      // 필수 필드가 아니더라도, 서버 스키마에 정의된 모든 필드를 함께 전송
      youtubeUrl: youtubeUrl || "",
      boardAddress: {
        zipcode: boardAddress.zipcode || "",
        address: boardAddress.streetAddress || "",
        addressDetail: boardAddress.detailAddress || "",
      },
      images: images || [""], // images 필드를 빈 배열로 전송
    };

    console.log("=======================", createBoardInput);

    try {
      const result = await createBoard({
        variables: {
          createBoardInput,
        },
      });

      console.log(result);
      console.log("=======================", createBoardInput);

      const boardId = result.data.createBoard._id;
      // alert는 iframe에서 보이지 않으므로 콘솔 로그로 대체
      console.log(`게시글 등록에 성공했습니다! (ID: ${boardId})`);

      // router.push(`/boards/${boardId}`);
    } catch (error) {
      console.error("게시글 등록 중 오류 발생:", error);
      // alert는 iframe에서 보이지 않으므로 콘솔 로그로 대체
      console.log("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="content-container">
      <h1 className="post-title">게시글 등록</h1>

      <div className="form-group first-group form-row-group">
        <div className="flex-1">
          <label className="label-required">작성자</label>
          <input
            type="text"
            className="input-field"
            placeholder="작성자를 입력해 주세요."
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
          />
          {errors.writer && (
            <div className="error-message">{errors.writer}</div>
          )}
        </div>
        <div className="flex-1">
          <label className="label-required">비밀번호</label>
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="error-message">{errors.password}</div>
          )}
        </div>
      </div>

      <div className="form-group">
        <label className="label-required">제목</label>
        <input
          type="text"
          className="input-field"
          placeholder="제목을 입력해 주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>

      <div className="form-group no-border">
        <label className="label-required">내용</label>
        <textarea
          className="textarea-field"
          placeholder="내용을 입력해 주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {errors.content && (
          <div className="error-message">{errors.content}</div>
        )}
      </div>

      <div className="form-group">
        <label>주소</label>
        <div className="flex-gap-8 mb-8">
          <input
            type="text"
            className="input-field w-120"
            placeholder="01234"
            value={boardAddress.zipcode}
            onChange={(e) =>
              setBoardAddress({ ...boardAddress, zipcode: e.target.value })
            }
          />
          <button className="button secondary">우편번호 검색</button>
        </div>
        <input
          type="text"
          className="input-field mb-8"
          placeholder="주소를 입력해 주세요."
          value={boardAddress.streetAddress}
          onChange={(e) =>
            setBoardAddress({ ...boardAddress, streetAddress: e.target.value })
          }
        />
        <input
          type="text"
          className="input-field"
          placeholder="상세주소"
          value={boardAddress.detailAddress}
          onChange={(e) =>
            setBoardAddress({ ...boardAddress, detailAddress: e.target.value })
          }
        />
      </div>

      <div className="form-group">
        <label>유튜브 링크</label>
        <input
          type="text"
          className="input-field"
          placeholder="링크를 입력해 주세요."
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>사진 첨부</label>
        <div className="file-upload-grid">
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="file-upload-box">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span>클릭해서 사진 업로드</span>
              </div>
            ))}
        </div>
      </div>

      <div className="button-container">
        <button className="button secondary">취소</button>
        <button
          className="button primary"
          onClick={handleSubmit}
          disabled={!isFormValid}
          style={{
            backgroundColor: isFormValid ? "#F26D21" : "#4B5563",
            color: isFormValid ? "#fff" : "#BDBDBD",
            cursor: isFormValid ? "pointer" : "not-allowed",
          }}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default BoardsNew;
