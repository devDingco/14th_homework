import { useState } from 'react';
import Head from 'next/head';

export default function GraphQLPractice() {
  const [activeProblem, setActiveProblem] = useState(null);

  const problems = [
    {
      id: 1,
      title: "철수의 나이는 몇살인가요?(나이만 조회해 주세요.)",
      query: `query {
  fetchProfile(name: "철수") {
    age
  }
}`,
      answer: `{
  "data": {
    "fetchProfile": {
      "age": 20
    }
  }
}`
    },
    {
      id: 2,
      title: "영희의 학교는 어디인가요?(학교만 조회해 주세요.)",
      query: `query {
  fetchProfile(name: "영희") {
    school
  }
}`,
      answer: `{
  "data": {
    "fetchProfile": {
      "school": "서울대학교"
    }
  }
}`
    },
    {
      id: 3,
      title: "3번 게시글의 내용과 작성일이 무엇인가요?(내용과 작성일만 조회해 주세요.)",
      query: `query {
  fetchBoard(number: 3) {
    contents
    createdAt
  }
}`,
      answer: `{
  "data": {
    "fetchBoard": {
      "contents": "GraphQL은 정말 강력한 쿼리 언어입니다.",
      "createdAt": "2023-05-15T14:30:00Z"
    }
  }
}`
    },
    {
      id: 4,
      title: "본인의 이름으로 프로필을 작성해 보세요.",
      query: `mutation {
  createProfile(
    createProfileInput: {
      name: "본인이름"
      age: 25
      school: "코드캠프"
    }
  ) {
    _id
    name
    age
    school
  }
}`,
      answer: "본인의 실제 이름과 정보를 입력하여 프로필을 생성합니다."
    },
    {
      id: 5,
      title: "본인의 이름으로 게시글을 작성해 보세요.",
      query: `mutation {
  createBoard(
    createBoardInput: {
      writer: "본인이름"
      title: "첫 번째 게시글"
      contents: "GraphQL을 배우고 있습니다!"
    }
  ) {
    _id
    number
    writer
    title
    contents
  }
}`,
      answer: "본인의 이름으로 게시글을 생성합니다."
    },
    {
      id: 6,
      title: "자신의 프로필을 조회해 보세요.",
      query: `query {
  fetchProfile(name: "본인이름") {
    _id
    name
    age
    school
  }
}`,
      answer: "본인의 프로필 정보를 조회합니다."
    },
    {
      id: 7,
      title: "자신의 게시글을 조회해 보세요.",
      query: `query {
  fetchBoards(writer: "본인이름") {
    _id
    number
    writer
    title
    contents
    createdAt
  }
}`,
      answer: "본인이 작성한 게시글 목록을 조회합니다."
    },
    {
      id: 8,
      title: "본인의 프로필에서, 학교를 자신이 졸업한 초등학교로 바꿔보세요.",
      query: `mutation {
  updateProfile(
    name: "본인이름"
    updateProfileInput: {
      school: "OO초등학교"
    }
  ) {
    _id
    name
    school
  }
}`,
      answer: "프로필의 학교 정보를 초등학교로 업데이트합니다."
    },
    {
      id: 9,
      title: "본인의 게시글에서, 제목과 내용을 바꿔보세요.",
      query: `mutation {
  updateBoard(
    number: 게시글번호
    updateBoardInput: {
      title: "변경된 제목"
      contents: "변경된 내용입니다."
    }
  ) {
    _id
    number
    title
    contents
  }
}`,
      answer: "게시글번호 부분에 실제 게시글 번호를 입력해야 합니다."
    },
    {
      id: 10,
      title: "자신이 좋아하는 만화 주인공으로 프로필을 작성해 보세요.",
      query: `mutation {
  createProfile(
    createProfileInput: {
      name: "만화주인공이름"
      age: 18
      school: "만화학교"
    }
  ) {
    _id
    name
    age
    school
  }
}`,
      answer: "좋아하는 만화 주인공 정보로 프로필을 생성합니다."
    },
    {
      id: 11,
      title: "위 10번에서 작성한 프로필을 삭제해 보세요.",
      query: `mutation {
  deleteProfile(name: "만화주인공이름")
}`,
      answer: "생성한 만화 주인공 프로필을 삭제합니다."
    },
    {
      id: 12,
      title: "상품을 하나 만들어 보세요.",
      query: `mutation {
  createProduct(
    createProductInput: {
      name: "상품명"
      description: "상품 설명"
      price: 10000
    }
  ) {
    _id
    name
    description
    price
  }
}`,
      answer: "새 상품을 생성합니다."
    },
    {
      id: 13,
      title: "위 12번에서 만들었던 상품의 가격을 500원 인상해 보세요.",
      query: `mutation {
  updateProduct(
    productId: "상품ID"
    updateProductInput: {
      price: 10500
    }
  ) {
    _id
    name
    price
  }
}`,
      answer: "상품ID 부분에 실제 상품 ID를 입력해야 합니다."
    },
    {
      id: 14,
      title: "위에서 만든 상품을 조회하되, 가격만 조회해 보세요.",
      query: `query {
  fetchProduct(productId: "상품ID") {
    price
  }
}`,
      answer: "상품의 가격 정보만 조회합니다."
    },
    {
      id: 15,
      title: "조회했던 상품을 삭제해 보세요.",
      query: `mutation {
  deleteProduct(productId: "상품ID")
}`,
      answer: "생성한 상품을 삭제합니다."
    },
    {
      id: 16,
      title: "삭제한 상품이 정말로 삭제되었는지 다시 한번 조회해 보세요.",
      query: `query {
  fetchProduct(productId: "상품ID") {
    _id
    name
    price
  }
}`,
      answer: `{
  "data": {
    "fetchProduct": null
  }
}`
    },
    {
      id: 17,
      title: "게시물 목록 중, 2페이지를 조회해 보세요.",
      query: `query {
  fetchBoards(page: 2) {
    _id
    number
    writer
    title
    createdAt
  }
}`,
      answer: "2페이지의 게시물 목록을 조회합니다."
    },
    {
      id: 18,
      title: "게시물 목록을 조회할 때, page를 입력하지 않으면, 어떤 결과가 발생하나요?",
      query: `query {
  fetchBoards {
    _id
    number
    writer
    title
    createdAt
  }
}`,
      answer: "page 매개변수를 입력하지 않으면 기본값으로 1페이지의 결과가 반환됩니다."
    },
    {
      id: 19,
      title: "프로필이 전체 몇 개가 있는지 확인해 보세요.",
      query: `query {
  fetchProfilesCount
}`,
      answer: `{
  "data": {
    "fetchProfilesCount": 150
  }
}`
    },
    {
      id: 20,
      title: "게시물은 몇 개가 있나요?",
      query: `query {
  fetchBoardsCount
}`,
      answer: `{
  "data": {
    "fetchBoardsCount": 325
  }
}`
    }
  ];

  const toggleProblem = (id) => {
    if (activeProblem === id) {
      setActiveProblem(null);
    } else {
      setActiveProblem(id);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>GraphQL API 연습 문제</title>
        <meta name="description" content="GraphQL API 연습 문제 해설" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">GraphQL API 연습 문제</h1>
        
        <div className="note">
          API 주소: http://backend-example.codebootcamp.co.kr/graphql
        </div>
        
        <div className="problems">
          {problems.map(problem => (
            <div key={problem.id} className="problem">
              <h3 onClick={() => toggleProblem(problem.id)}>
                {problem.id}) {problem.title}
              </h3>
              
              {activeProblem === problem.id && (
                <div className="solution">
                  <div className="query">
                    <h4>Query:</h4>
                    <pre>{problem.query}</pre>
                  </div>
                  <div className="answer">
                    <h4>Answer:</h4>
                    <pre>{problem.answer}</pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 2rem;
          background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
        }
        
        .main {
          padding: 4rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 2.5rem;
          color: white;
          text-align: center;
          margin-bottom: 2rem;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
        }
        
        .note {
          background: rgba(255, 255, 255, 0.1);
          color: white;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 2rem;
          text-align: center;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .problems {
          width: 100%;
          max-width: 800px;
        }
        
        .problem {
          background: white;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .problem:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .problem h3 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.2rem;
          border-bottom: 2px solid #3498db;
          padding-bottom: 10px;
        }
        
        .solution {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #eee;
        }
        
        .query, .answer {
          margin-bottom: 15px;
        }
        
        .query h4, .answer h4 {
          margin: 0 0 10px 0;
          color: #2c3e50;
          font-size: 1rem;
        }
        
        pre {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          overflow-x: auto;
          font-size: 0.9rem;
          line-height: 1.4;
          margin: 0;
        }
        
        .query pre {
          background: #2c3e50;
          color: white;
        }
        
        .answer pre {
          background: #d4edda;
          color: #155724;
          border-left: 3px solid #28a745;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}