"use client";

import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

const CREATE_BOARD = gql`
  mutation CreateBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
    }
  }
`;

export default function BoardNewPage() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const [createBoard] = useMutation(CREATE_BOARD);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer,
            password,
            title,
            contents,
          },
        },
      });

      if (result.data?.createBoard?._id) {
        router.push(`/boards/${result.data.createBoard._id}`);
      }
    } catch (error) {
      console.error("Error creating board:", error);
      setErrorMessage("에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="container">
      <h1>게시글 작성</h1>

      {errorMessage && (
        <div style={{ color: "red", marginBottom: "20px" }}>{errorMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>작성자</label>
          <input
            type="text"
            value={writer}
            onChange={(e) => setWriter(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>내용</label>
          <textarea
            value={contents}
            onChange={(e) => setContents(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", minHeight: "200px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          게시글 등록하기
        </button>
      </form>
    </div>
  );
}
