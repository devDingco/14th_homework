// src/app/boards/page.tsx
'use client';

import { useQuery, gql } from '@apollo/client';
import Link from 'next/link';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <header>
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
          <div className="parasol"><i className="fas fa-umbrella-beach"></i></div>
          <div className="beach-chair"><i className="fas fa-chair"></i></div>
          <div className="beach-chair-icon"><i className="fas fa-chair"></i></div>
        </div>
        
        <hr />
      </header>
      
      <div className="board-info">
        <h2>트립토크 게시판</h2>
        <div className="date-range">YYYY .MM .DD - YYYY .MM .DD</div>
        <p>필요한 내용을 검색해 주세요.</p>
        
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="검색" />
        </div>
        
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
          <Link 
            href="/boards/new"
            style={{
              padding: "10px 20px",
              backgroundColor: "#3498db",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold"
            }}
          >
            글쓰기
          </Link>
        </div>
        
        <table>
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
                <td>{index + 1}</td>
                <td>{board.title}</td>
                <td>{board.writer}</td>
                <td>{new Date(Number(board.createdAt)).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="pagination">
          <a href="#">&lt;</a>
          <a href="#">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">&gt;</a>
        </div>
      </div>
    </div>
  );
}