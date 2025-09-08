"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// GraphQL 쿼리/뮤테이션 정의
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

const UPDATE_BOARD = gql`
  mutation updateBoard($updateBoardInput: UpdateBoardInput!, $password: String!, $boardId: ID!) {
    updateBoard(updateBoardInput: $updateBoardInput, password: $password, boardId: $boardId) {
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
      youtubeUrl
      boardAddress {
        zipcode
        address
        addressDetail
      }
      images
    }
  }
`;

// TypeScript 오류를 해결하기 위해 Errors 상태와 updateBoardInput의 타입을 명시적으로 정의합니다.
interface ErrorsState {
  writer: string;
  password: string;
  title: string;
  contents: string;
}

interface UpdateBoardInput {
  title?: string;
  contents?: string;
  youtubeUrl?: string;
  boardAddress?: {
    zipcode?: string;
    address?: string;
    addressDetail?: string;
  };
  images?: string[];
}

interface BoardsWriteProps {
  isEdit: boolean;
  boardId?: string;
}

export default function BoardsWrite(props: BoardsWriteProps) {
  const router = useRouter();

  // GraphQL 뮤테이션 훅 사용
  const [createBoard] = useMutation(CREATE_BOARD);
  const [updateBoard] = useMutation(UPDATE_BOARD);

  // 게시글 데이터 불러오기 (수정 모드일 때만)
  const { data, loading, error } = useQuery(FETCH_BOARD, {
    variables: { boardId: props.boardId as string },
    skip: !props.isEdit || !props.boardId, // 수정 모드가 아니거나 ID가 없으면 쿼리 건너뛰기
  });

  // 상태 변수 정의: 입력 필드의 값들을 관리합니다.
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [boardAddress, setBoardAddress] = useState({
    zipcode: "",
    address: "",
    addressDetail: "",
  });
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState<ErrorsState>({
    writer: "",
    password: "",
    title: "",
    contents: "",
  });

  // 게시글 데이터가 로딩되면 폼 필드에 데이터를 채워 넣습니다.
  useEffect(() => {
    if (props.isEdit && data) {
      const boardData = data.fetchBoard;
      setWriter(boardData.writer);
      setTitle(boardData.title);
      setContents(boardData.contents);
      setYoutubeUrl(boardData.youtubeUrl || "");
      setBoardAddress(boardData.boardAddress || { zipcode: "", address: "", addressDetail: "" });
      setImages(boardData.images || []);
    }
  }, [props.isEdit, data]);

  // 필수 입력 필드 유효성 검사
  const isFormValid = writer && password && title && contents;

  // 입력 필드 변경 핸들러
  const onChangeWriter = (event: React.ChangeEvent<HTMLInputElement>) => setWriter(event.target.value);
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);
  const onChangeContents = (event: React.ChangeEvent<HTMLTextAreaElement>) => setContents(event.target.value);

  // "등록하기" 버튼 클릭 핸들러
  const onClickSubmit = async () => {
    let hasError = false;
    const newErrors: ErrorsState = { writer: "", password: "", title: "", contents: "" };

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
    if (!contents) {
      newErrors.contents = "필수입력 사항입니다.";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    try {
      const createBoardInput = {
        writer,
        password,
        title,
        contents,
        youtubeUrl: youtubeUrl || "",
        boardAddress: {
          zipcode: boardAddress.zipcode || "",
          address: boardAddress.address || "",
          addressDetail: boardAddress.addressDetail || "",
        },
        images: images || [""],
      };

      const result = await createBoard({
        variables: {
          createBoardInput,
        },
      });
      console.log(result);
      alert("게시글이 성공적으로 등록되었습니다.");
      router.push(`/boards/${result.data.createBoard._id}`);
    } catch (error) {
      console.error(error);
      alert("에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  // "수정하기" 버튼 클릭 핸들러
  const onClickUpdate = async () => {
    const myPassword = window.prompt("글을 입력할때 입력하셨던 비밀번호를 입력해주세요");

    if (!myPassword) {
      return;
    }

    try {
      // 변경된 값만 변수에 담기 위해 UpdateBoardInput 타입으로 객체 초기화
      const updateBoardInput: UpdateBoardInput = {};
      const originalData = data?.fetchBoard;

      if (title !== originalData?.title) {
        updateBoardInput.title = title;
      }
      if (contents !== originalData?.contents) {
        updateBoardInput.contents = contents;
      }
      if (youtubeUrl !== originalData?.youtubeUrl) {
        updateBoardInput.youtubeUrl = youtubeUrl;
      }
      if (boardAddress.zipcode !== originalData?.boardAddress?.zipcode ||
          boardAddress.address !== originalData?.boardAddress?.address ||
          boardAddress.addressDetail !== originalData?.boardAddress?.addressDetail) {
        updateBoardInput.boardAddress = {
          zipcode: boardAddress.zipcode,
          address: boardAddress.address,
          addressDetail: boardAddress.addressDetail,
        };
      }
      if (JSON.stringify(images) !== JSON.stringify(originalData?.images)) {
        updateBoardInput.images = images;
      }

      const result = await updateBoard({
        variables: {
          boardId: props.boardId as string,
          password: myPassword,
          updateBoardInput,
        },
      });

      console.log(result);
      alert("수정 완료!");
      router.push(`/boards/${props.boardId}`);
    } catch (error) {
      console.error(error);
      // 'error'를 'any' 타입으로 처리하여 graphQLErrors에 접근
      if ((error as any).graphQLErrors?.[0]?.message.includes("비밀번호가 일치하지 않습니다.")) {
        alert("비밀번호가 틀렸습니다.");
      } else {
        alert((error as any).message);
      }
    }
  };

  // "취소" 버튼 클릭 핸들러
  const onClickCancel = () => {
    router.push("/boards");
  };

  // 로딩 상태 처리
  if (loading) {
    return <div className="text-center mt-20">게시글 정보를 불러오는 중입니다...</div>;
  }

  // 에러 상태 처리
  if (error) {
    return <div className="text-center mt-20 text-red-500">게시글을 불러오는 중 에러가 발생했습니다.</div>;
  }

  return (
    <div className="content-container">
      <h1 className="post-title">{props.isEdit ? "게시글 수정" : "게시글 작성"}</h1>

      <div className="form-group first-group form-row-group">
        <div className="flex-1">
          <label className="label-required">작성자</label>
          <input
            type="text"
            className="input-field"
            placeholder="작성자를 입력해 주세요."
            value={writer}
            onChange={onChangeWriter}
            disabled={props.isEdit}
          />
          {errors.writer && <div className="error-message">{errors.writer}</div>}
        </div>
        <div className="flex-1">
          <label className="label-required">비밀번호</label>
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호를 입력해 주세요."
            value={password}
            onChange={onChangePassword}
            disabled={props.isEdit}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
      </div>

      <div className="form-group">
        <label className="label-required">제목</label>
        <input
          type="text"
          className="input-field"
          placeholder="제목을 입력해 주세요."
          value={title}
          onChange={onChangeTitle}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}
      </div>

      <div className="form-group no-border">
        <label className="label-required">내용</label>
        <textarea
          className="textarea-field"
          placeholder="내용을 입력해 주세요."
          value={contents}
          onChange={onChangeContents}
        ></textarea>
        {errors.contents && <div className="error-message">{errors.contents}</div>}
      </div>

      <div className="form-group">
        <label>주소</label>
        <div className="flex-gap-8 mb-8">
          <input
            type="text"
            className="input-field w-120"
            placeholder="01234"
            value={boardAddress.zipcode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBoardAddress({ ...boardAddress, zipcode: e.target.value })
            }
          />
          <button className="button secondary">우편번호 검색</button>
        </div>
        <input
          type="text"
          className="input-field mb-8"
          placeholder="주소를 입력해 주세요."
          value={boardAddress.address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBoardAddress({ ...boardAddress, address: e.target.value })
          }
        />
        <input
          type="text"
          className="input-field"
          placeholder="상세주소"
          value={boardAddress.addressDetail}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBoardAddress({ ...boardAddress, addressDetail: e.target.value })
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYoutubeUrl(e.target.value)}
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
        <button className="button secondary" onClick={onClickCancel}>취소</button>
        <button
          className="button primary"
          onClick={props.isEdit ? onClickUpdate : onClickSubmit}
          disabled={!props.isEdit && !isFormValid}
          style={
            props.isEdit
              ? { backgroundColor: "#F26D21", color: "#fff", cursor: "pointer" }
              : {
                  backgroundColor: isFormValid ? "#F26D21" : "#4B5563",
                  color: isFormValid ? "#fff" : "#BDBDBD",
                  cursor: isFormValid ? "pointer" : "not-allowed",
                }
          }
        >
          {props.isEdit ? "수정하기" : "등록하기"}
        </button>
      </div>
    </div>
  );
}
