'use client';
// import "./styles.module.css";
import styles from './styles.module.css';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { writer } from 'repl';

const FETCH_BOARDS = gql`
  query fetchBoards {
    fetchBoards {
      _id
      writer
      title
      contents
    }
  }
`;

const FETCH_BOARDS_COUNT = gql`
  query fetchBoardsCount {
    fetchBoardsCount
  }
`;

const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

export default function MapBoardsDeletePage() {
  const { data } = useQuery(FETCH_BOARDS);
  const [deleteBoard] = useMutation(DELETE_BOARD);

  //   console.log(data?.fetchBoards[0]._id); // 잘 불러왔는지 확인

  const onClickDelete = async (id) => {
    await deleteBoard({
      variables: {
        boardId: id,
      },
      refetchQueries: [{ query: FETCH_BOARDS }, { query: FETCH_BOARDS_COUNT }],
    });
  };

  // 전체 게시글 수 조회
  const { data: TotalBoardsData } = useQuery(FETCH_BOARDS_COUNT);
  const number = TotalBoardsData?.fetchBoardsCount;

  // 페이지 이동
  const router = useRouter();

  // console.log(number);

  //   interface IFetchBoard {
  //     id: string;
  //     writer: string;
  //     title: string;
  //   }
  return (
    <div className={styles.layout}>
      <div className={styles.layout2}>
        <div className={styles.body}>
          <div className={styles.board}>
            <div className={styles.list_board}>
              <div className={styles.list}>
                <div className={styles.name}>
                  <span>번호</span>
                  <span>제목</span>
                  <span>작성자</span>
                  <span>날짜</span>
                </div>
                <div className={styles.post}>
                  {data?.fetchBoards.map((el, index) => {
                    return (
                      <div key={index}>
                        <div className={styles.post_info}>
                          <span style={{ color: '#919191' }}>{number - index}</span>
                          <span
                            style={{ color: '#1C1C1C' }}
                            onClick={() => router.push(`/boards/${el._id}`)}
                          >
                            {el.title}
                          </span>
                          <span style={{ color: '#333' }}>{el.writer}</span>
                          <span style={{ color: '#919191' }}></span>
                          <span>
                            <button onClick={() => onClickDelete(el._id)}>삭제</button>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// const App: React.FC = () => {
//   return (
//     <div className={styles.layout}>
//       <div className={styles.layout2}>
//         <div className={styles.body}>
//           <div className={styles.board}>
//             <div className={styles.list_board}>
//               <div className={styles.list}>
//                 <div className={styles.name}>
//                   <p>번호</p>
//                   <p>제목</p>
//                   <p>작성자</p>
//                   <p>날짜</p>
//                 </div>
//                 <div className={styles.post}>
//                   <div className={styles.post_info}>
//                     <p style={{ color: '#919191' }}>123</p>
//                     <p style={{ color: '#1C1C1C' }}>제주 살이 N일차</p>
//                     <p style={{ color: '#333' }}>홍길동</p>
//                     <p style={{ color: '#919191' }}>2025.09.04</p>
//                   </div>
//                   <div className={styles.post_info}>
//                     <p style={{ color: '#919191' }}>123</p>
//                     <p style={{ color: '#1C1C1C' }}>제주 살이 N일차</p>
//                     <p style={{ color: '#333' }}>홍길동</p>
//                     <p style={{ color: '#919191' }}>2025.09.04</p>
//                   </div>
//                   <div className={styles.post_info}>
//                     <p style={{ color: '#919191' }}>123</p>
//                     <p style={{ color: '#1C1C1C' }}>제주 살이 N일차</p>
//                     <p style={{ color: '#333' }}>홍길동</p>
//                     <p style={{ color: '#919191' }}>2025.09.04</p>
//                   </div>
//                   <div className={styles.post_info}>
//                     <p style={{ color: '#919191' }}>123</p>
//                     <p style={{ color: '#1C1C1C' }}>제주 살이 N일차</p>
//                     <p style={{ color: '#333' }}>홍길동</p>
//                     <p style={{ color: '#919191' }}>2025.09.04</p>
//                   </div>
//                   <div className={styles.post_info}>
//                     <p style={{ color: '#919191' }}>123</p>
//                     <p style={{ color: '#1C1C1C' }}>제주 살이 N일차</p>
//                     <p style={{ color: '#333' }}>홍길동</p>
//                     <p style={{ color: '#919191' }}>2025.09.04</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
