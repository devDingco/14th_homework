// src/app/boards/page.tsx
"use client";

import { useQuery, gql } from "@apollo/client";
import Link from "next/link";

const FETCH_BOARDS = gql`
  query FetchBoards {
    fetchBoards {
      _id
      writer
      title
      createdAt
    }
  }
`;

export default function BoardListPage() {
  const { data, loading, error } = useQuery(FETCH_BOARDS);

  if (loading)
    return (
      <div className="container">
        <div className="loading">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="container">
        <div className="error">Error: {error.message}</div>
      </div>
    );

  return (
    <div className="container">
      <header className="header">
        <h1>오늘 핫한 트립토크</h1>
        <p>트립토크 게시글 제목이 들어갑니다.</p>

        <div className="post-info">
          <div className="author">
            <div className="author-avatar">👩</div>
            <div className="author-name">홍길동</div>
          </div>
          <div className="post-meta">
            <div>❤️ 24</div>
            <div>2024.11.11</div>
          </div>
        </div>

        <div className="beach-scene">
          <div className="parasol">🌴</div>
          <div className="beach-chair">⛱️</div>
        </div>

        <hr />
      </header>

      <div className="board-info">
        <h2>트립토크 게시판</h2>
        <div className="date-range">2024.12.16 - 2024.12.16</div>
        <p>필요한 내용을 검색해 주세요.</p>

        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="검색" />
        </div>

        <div className="write-button-container">
          <Link href="/boards/new" className="write-button">
            글쓰기
          </Link>
        </div>

        <table className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            {data?.fetchBoards.map((board: any, index: number) => (
              <tr key={board._id}>
                <td>{data.fetchBoards.length - index}</td>
                <td className="title-cell">
                  <Link href={`/boards/${board._id}`} className="title-link">
                    {board.title}
                  </Link>
                </td>
                <td>{board.writer}</td>
                <td>
                  {new Date(Number(board.createdAt))
                    .toLocaleDateString("ko-KR")
                    .replace(/\. /g, ".")
                    .replace(/\.$/, "")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <a href="#">&lt;</a>
          <a href="#" className="active">
            1
          </a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">&gt;</a>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          color: #333;
        }

        .header {
          position: relative;
          margin-bottom: 30px;
        }

        .header h1 {
          font-size: 24px;
          margin-bottom: 10px;
          color: #2c5aa0;
        }

        .header p {
          color: #666;
          margin-bottom: 20px;
        }

        .post-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .author {
          display: flex;
          align-items: center;
        }

        .author-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
        }

        .author-name {
          font-weight: bold;
        }

        .post-meta {
          display: flex;
          gap: 15px;
          color: #888;
        }

        .beach-scene {
          position: absolute;
          right: 0;
          top: 0;
          display: flex;
          gap: 10px;
          font-size: 24px;
        }

        hr {
          border: none;
          border-top: 1px solid #eee;
          margin: 20px 0;
        }

        .board-info h2 {
          font-size: 20px;
          margin-bottom: 10px;
          color: #2c5aa0;
        }

        .date-range {
          color: #888;
          margin-bottom: 5px;
        }

        .board-info > p {
          color: #666;
          margin-bottom: 20px;
        }

        .search-box {
          position: relative;
          margin-bottom: 20px;
          max-width: 300px;
        }

        .search-icon {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          color: #888;
        }

        .search-box input {
          width: 100%;
          padding: 10px 10px 10px 35px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .write-button-container {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 20px;
        }

        .write-button {
          padding: 10px 20px;
          background-color: #3498db;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
          display: inline-block;
        }

        .board-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 30px;
        }

        .board-table th,
        .board-table td {
          padding: 12px 15px;
          text-align: center;
          border-bottom: 1px solid #eee;
        }

        .board-table th {
          background-color: #f8f9fa;
          font-weight: bold;
          color: #555;
        }

        .title-cell {
          text-align: left !important;
        }

        .title-link {
          color: #333;
          text-decoration: none;
        }

        .title-link:hover {
          text-decoration: underline;
          color: #2c5aa0;
        }

        .pagination {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 30px;
        }

        .pagination a {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          text-decoration: none;
          color: #555;
        }

        .pagination a.active {
          background-color: #3498db;
          color: white;
          border-color: #3498db;
        }

        .pagination a:hover:not(.active) {
          background-color: #f0f0f0;
        }

        .loading,
        .error {
          text-align: center;
          padding: 40px;
          font-size: 18px;
        }

        .error {
          color: #e74c3c;
        }
      `}</style>
    </div>
  );
}
