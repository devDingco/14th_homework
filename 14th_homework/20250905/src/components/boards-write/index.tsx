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
    <div className="flex flex-col items-center p-8 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {props.isEdit ? "게시글 수정" : "게시글 작성"}
        </h1>
        <div className="mb-4">
          <label htmlFor="writer" className="block text-gray-700 font-bold mb-2">
            작성자
          </label>
          <input
            type="text"
            id="writer"
            value={writer}
            onChange={onChangeWriter}
            disabled={props.isEdit}
            placeholder="작성자를 입력해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
          {errors.writer && <div className="text-red-500 text-sm mt-1">{errors.writer}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
            disabled={props.isEdit}
            placeholder="비밀번호를 입력해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-200 disabled:cursor-not-allowed"
          />
          {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password}</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            제목
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력해주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {errors.title && <div className="text-red-500 text-sm mt-1">{errors.title}</div>}
        </div>
        <div className="mb-6">
          <label htmlFor="contents" className="block text-gray-700 font-bold mb-2">
            내용
          </label>
          <textarea
            id="contents"
            value={contents}
            onChange={onChangeContents}
            placeholder="내용을 입력해주세요."
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          ></textarea>
          {errors.contents && <div className="text-red-500 text-sm mt-1">{errors.contents}</div>}
        </div>
        {/* 주소, 유튜브, 사진 첨부 관련 필드 추가 */}
        <div className="mb-4">
            <label htmlFor="youtubeUrl" className="block text-gray-700 font-bold mb-2">
              유튜브 링크
            </label>
            <input
              type="text"
              id="youtubeUrl"
              value={youtubeUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYoutubeUrl(e.target.value)}
              placeholder="링크를 입력해주세요."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">주소</label>
          <div className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={boardAddress.zipcode}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBoardAddress({ ...boardAddress, zipcode: e.target.value })}
              placeholder="우편번호"
              className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
            />
            <button
              className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
            >
              우편번호 검색
            </button>
          </div>
          <input
            type="text"
            value={boardAddress.address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBoardAddress({ ...boardAddress, address: e.target.value })}
            placeholder="주소를 입력해 주세요."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
          />
          <input
            type="text"
            value={boardAddress.addressDetail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBoardAddress({ ...boardAddress, addressDetail: e.target.value })}
            placeholder="상세주소"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">사진 첨부</label>
          <div className="flex items-center space-x-4">
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="w-24 h-24 bg-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-300">
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
                  <span className="text-xs mt-1">클릭해서 업로드</span>
                </div>
              ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
            <button
                className="px-6 py-3 rounded-lg font-bold text-white bg-gray-400 hover:bg-gray-500 transition-colors"
                onClick={onClickCancel}
            >
                취소
            </button>
            <button
                className={`px-6 py-3 rounded-lg font-bold transition-colors ${
                    !props.isEdit && !isFormValid
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
                onClick={props.isEdit ? onClickUpdate : onClickSubmit}
                disabled={!props.isEdit && !isFormValid}
            >
                {props.isEdit ? "수정하기" : "등록하기"}
            </button>
        </div>
      </div>
    </div>
  );
}
