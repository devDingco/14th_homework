'use client';

import Image from 'next/image';
import React, { MouseEvent } from 'react';
import styles from './page.module.css';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import deleteIcon from '../../assets/icons/delete.png';

// 게시글 데이터의 타입을 정의
interface Board {
  _id: string;
  writer: string;
  title: string;
  contents: string;
  createdAt: string;
}

// 게시글 목록을 가져올 때의 데이터 타입 정의
interface FetchBoardsData {
  fetchBoards: Board[]; // Board 배열
}

// 게시글 목록을 가져오는 GraphQL 쿼리
const FETCH_BOARDS = gql`
  query fetchBoards(
    $endDate: DateTime # 쿼리 변수 정의
    $startDate: DateTime
    $search: String
    $page: Int
  ) {
    fetchBoards( # 서버의 fetchBoards 함수 호출
      endDate: $endDate # 위에서 정의한 변수들을
      startDate: $startDate # 함수의 매개변수로 전달
      search: $search
      page: $page
    ) {
      # 서버에서 받아올 데이터 필드들 지정
      _id
      writer
      title
      contents
      createdAt
    }
  }
`;

// 게시글을 삭제하는 GraphQL 뮤테이션
const DELETE_BOARD = gql`
  mutation deleteBoard($boardId: ID!) {
    deleteBoard(boardId: $boardId)
  }
`;

// 게시글 목록 페이지 컴포넌트
export default function BoardsPage() {
  // 게시글 목록 데이터를 가져오는 훅 (자동으로 실행됨)
  const { data } = useQuery<FetchBoardsData>(FETCH_BOARDS);

  // 게시글 삭제 뮤테이션 훅 (필요할 때 실행)
  const [deleteBoard] = useMutation(DELETE_BOARD);

  // 페이지 이동을 위한 라우터
  const router = useRouter();

  // 개발자 도구에서 데이터 확인
  console.log(data?.fetchBoards);

  // 게시글 제목을 클릭했을 때 상세 페이지로 이동하는 함수
  const onClickTitle = (boardId: string) => {
    router.push(`/boards/detail/${boardId}`);
  };

  // 삭제 버튼을 클릭했을 때 실행되는 함수
  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    // event.currentTarget을 사용해서 실제 button 요소 가져오기
    // (event.target은 Image 컴포넌트를 가리킬 수 있음)
    const button = event.currentTarget as HTMLButtonElement;
    const boardId = button.id; // 버튼의 id 속성에서 게시글 ID 가져옴

    console.log('삭제할 게시글 ID:', boardId); // 디버그용 로그
    alert('게시글이 삭제 되었습니다.');

    // boardId가 비어있으면 삭제 중단
    if (!boardId) {
      alert('게시글 ID를 찾을 수 없습니다.');
      return;
    }

    try {
      // 삭제 뮤테이션 실행
      await deleteBoard({
        variables: {
          boardId: boardId,
        },
        refetchQueries: [{ query: FETCH_BOARDS }], // 삭제 후 목록 다시 불러오기
      });
      alert('게시글이 삭제되었습니다.'); // 성공 알림
    } catch (error) {
      console.error('삭제 실패:', error); // 에러 로그
      alert('삭제에 실패했습니다. 작성자만 삭제할 수 있습니다.'); // 실패 알림
    }
  };
  // JSX 반환 (실제 화면에 보여질 내용)
  return (
    <div className={styles.container}>
      {' '}
      {/* 전체 컨테이너 */}
      <div className={styles.boardsContainer}>
        {' '}
        {/* 게시글 목록 컨테이너 */}
        {/* 테이블 헤더 부분 */}
        <div className={styles.postHeader}>
          <div className={styles.leftGroup}>
            {' '}
            {/* 왼쪽 그룹 (번호, 제목) */}
            <span>번호</span>
            <span>제목</span>
          </div>
          <div className={styles.rightGroup}>
            {' '}
            {/* 오른쪽 그룹 (작성자, 날짜) */}
            <span>작성자</span>
            <span>날짜</span>
          </div>
        </div>
        {/* 게시물 목록을 반복해서 표시 */}
        {data?.fetchBoards?.map((el: Board, index: number) => {
          return (
            <div key={el._id} className={styles.postItem}>
              {' '}
              {/* 각 게시글 항목 */}
              {/* 왼쪽 부분: 번호와 제목 */}
              <div className={styles.leftGroup}>
                <span>{index + 1}</span> {/* 게시글 번호 (배열 인덱스 + 1) */}
                <span
                  onClick={() => onClickTitle(el._id)} // 제목 클릭 시 상세 페이지로 이동
                >
                  {el.title} {/* 게시글 제목 */}
                </span>
              </div>
              {/* 오른쪽 부분: 작성자와 날짜 */}
              <div className={styles.rightGroup}>
                <span>{el.writer}</span> {/* 작성자 이름 */}
                <span>
                  {/* 작성일을 한국 날짜 형식으로 변환 */}
                  {new Date(el.createdAt).toLocaleDateString('ko-KR')}
                </span>
              </div>
              {/* 삭제 버튼 (호버 시에만 보임, 절대 위치로 배치) */}
              <button
                id={el._id} // 버튼의 id를 게시글 ID로 설정
                onClick={onClickDelete} // 클릭 시 삭제 함수 실행
                className={styles.deleteBtn} // 삭제 버튼 스타일
              >
                <Image src={deleteIcon} alt="delete" width={24} height={24} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
