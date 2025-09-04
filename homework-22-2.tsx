"use client";

import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/navigation";

const CREATE_BOARD = gql`
  mutation CreateBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      _id
      writer
      title
      contents
    }
  }
`;

const CREATE_PRODUCT = gql`
  mutation CreateProduct($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      _id
      name
      description
      price
    }
  }
`;

export default function BoardNewPage() {
  const [writer, setWriter] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 상품 등록을 위한 상태
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);

  const router = useRouter();
  const [createBoard] = useMutation(CREATE_BOARD);
  const [createProduct] = useMutation(CREATE_PRODUCT);

  // REST-API 요청 함수
  const handleRestApiRequest = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );
      const data = await response.json();
      console.log("REST-API 응답:", data);
      alert("REST-API 응답을 콘솔에서 확인하세요!");
    } catch (error) {
      console.error("REST-API 요청 중 오류 발생:", error);
      alert("REST-API 요청 중 오류가 발생했습니다.");
    }
  };

  // GraphQL-API 요청 함수 (하드코딩)
  const handleGraphqlApiRequestHardcoded = async () => {
    try {
      const result = await createBoard({
        variables: {
          createBoardInput: {
            writer: "하드코딩작성자",
            password: "1234",
            title: "하드코딩제목",
            contents: "하드코딩내용",
          },
        },
      });
      console.log("GraphQL-API 응답 (하드코딩):", result.data?.createBoard);
      alert("GraphQL-API 응답 (하드코딩)을 콘솔에서 확인하세요!");
    } catch (error) {
      console.error("GraphQL-API 요청 중 오류 발생:", error);
      alert("GraphQL-API 요청 중 오류가 발생했습니다.");
    }
  };

  // GraphQL-API 요청 함수 (사용자 입력)
  const handleGraphqlApiRequest = async (e: React.FormEvent) => {
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

      console.log("GraphQL-API 응답 (사용자 입력):", result.data?.createBoard);
      alert("GraphQL-API 응답 (사용자 입력)을 콘솔에서 확인하세요!");

      if (result.data?.createBoard?._id) {
        router.push(`/boards/${result.data.createBoard._id}`);
      }
    } catch (error) {
      console.error("Error creating board:", error);
      setErrorMessage("에러가 발생하였습니다. 다시 시도해 주세요.");
    }
  };

  // 상품 등록 함수
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createProduct({
        variables: {
          createProductInput: {
            name: productName,
            description: productDescription,
            price: productPrice,
          },
        },
      });

      console.log("상품 등록 응답:", result.data?.createProduct);
      alert("상품이 등록되었습니다! 응답을 콘솔에서 확인하세요.");

      // 입력 필드 초기화
      setProductName("");
      setProductDescription("");
      setProductPrice(0);
    } catch (error) {
      console.error("Error creating product:", error);
      alert("상품 등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div
      className="container"
      style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
    >
      <h1>Day 22 v.2.0 - API 요청 데모</h1>

      {/* REST-API 요청 섹션 */}
      <section
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>1. REST-API 요청하기</h2>
        <p>Endpoint: https://jsonplaceholder.typicode.com/users/1</p>
        <button
          onClick={handleRestApiRequest}
          style={{
            padding: "10px 20px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          REST-API 요청하기
        </button>
      </section>

      {/* GraphQL-API 요청 섹션 (하드코딩) */}
      <section
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>2. GraphQL-API 요청하기 (하드코딩)</h2>
        <button
          onClick={handleGraphqlApiRequestHardcoded}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2ecc71",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          GraphQL-API 요청하기 (하드코딩)
        </button>
      </section>

      {/* GraphQL-API 요청 섹션 (사용자 입력) */}
      <section
        style={{
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>3. GraphQL-API 요청하기 (사용자 입력)</h2>

        {errorMessage && (
          <div style={{ color: "red", marginBottom: "20px" }}>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleGraphqlApiRequest}>
          <div style={{ marginBottom: "15px" }}>
            <label>작성자</label>
            <input
              type="text"
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>내용</label>
            <textarea
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                minHeight: "100px",
                marginTop: "5px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#2ecc71",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            GraphQL-API 요청하기 (사용자 입력)
          </button>
        </form>
      </section>

      {/* 상품 등록 섹션 */}
      <section
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h2>4. 상품 등록하기</h2>

        <form onSubmit={handleProductSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>상품명</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>상품 설명</label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "8px",
                minHeight: "100px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>가격</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(Number(e.target.value))}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#9b59b6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            상품 등록하기
          </button>
        </form>
      </section>
    </div>
  );
}
