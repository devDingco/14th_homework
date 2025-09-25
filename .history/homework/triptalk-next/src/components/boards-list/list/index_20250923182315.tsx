/**
 * 🎯 시험 포인트: 게시글 목록 컴포넌트 - 문자열 처리 및 하이라이트
 */
'use client';

// 🎯 시험 출제: import 구문
import Image from 'next/image';           // Next.js 이미지 최적화 컴포넌트
import styles from './page.module.css';   // CSS 모듈 import
import useBoardsList from './hooks';      // 커스텀 훅 import
import AllModal from '@/components/all-modal'; // 모달 컴포넌트

// 🎯 시험 출제: TypeScript interface 정의
interface BoardsListProps {
  data: any;          // 게시글 데이터 배열
  keyword?: string;   // 검색어 (선택적 props - ? 사용)
}

// 🎯 시험 출제: 기본값 매개변수 (default parameter)
export default function BoardsList({ data, keyword = '' }: BoardsListProps) {
  // 🎯 시험 출제: 커스텀 훅 사용법
  // 커스텀 훅에서 여러 함수와 상태를 구조분해로 받아오기
  const { onClickTitle, onClickDelete, modalOpen, modalMessage, closeModal } = useBoardsList();

  return (
    <div className={styles.container}>
      {/* 전체 컨테이너 */}
      <div className={styles.boardsContainer}>
        {/* 게시글 목록 컨테이너 */}
        {/* 테이블 헤더 부분 */}
        <div className={styles.postHeader}>
          <div className={styles.leftGroup}>
            {/* 왼쪽 그룹 (번호, 제목) */}
            <span>번호</span>
            <span>제목</span>
          </div>
          <div className={styles.rightGroup}>
            {/* 오른쪽 그룹 (작성자, 날짜) */}
            <span>작성자</span>
            <span>날짜</span>
          </div>
        </div>
        {/* 게시물 목록을 반복해서 표시 */}
        {data?.map((el, index: number) => {
          return (
            <div 
              key={el._id} 
              className={styles.postItem}
              onClick={() => onClickTitle(el._id)} // div 전체 클릭 시 상세 페이지로 이동
            >
              {/* 각 게시글 항목 */}
              {/* 왼쪽 부분: 번호와 제목 */}
              <div className={styles.leftGroup}>
                <span>{index + 1}</span> {/* 게시글 번호 */}
                <span>
                  {/* 🎯 시험 출제: 조건부 렌더링 및 문자열 처리 (중요!) */}
                  {keyword ? (
                    // 검색어가 있을 때: 하이라이트 적용
                    el.title
                      // 🎯 1단계: replaceAll() - 검색어를 구분자로 감싼
                      .replaceAll(keyword, `#$%${keyword}#$%`)
                      // 예시: "Hello World" -> "#$%Hello#$% World" (검색어가 "Hello"일 때)

                      // 🎯 2단계: split() - 구분자로 문자열 나누기
                      .split('#$%')
                      // 예시: ["" , "Hello", " World"] 배열로 변환

                      // 🎯 3단계: map() - 각 부분을 JSX로 변환
                      .map((part, index) => (
                        <span
                          key={`${part}_${index}`}  // React key props (중요!)
                          // 🎯 조건부 스타일링: 검색어와 일치하면 빨간색
                          style={{ color: part === keyword ? 'red' : 'black' }}
                        >
                          {part}  {/* 각 부분 텍스트 출력 */}
                        </span>
                      ))
                  ) : (
                    // 검색어가 없을 때: 일반 제목 표시
                    el.title
                  )}
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
                <Image
                  src="/icons/delete.png"
                  alt="delete"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          );
        })}
      </div>
      <AllModal
        open={modalOpen}
        message={modalMessage}
        onClose={closeModal}
      />
    </div>
  );
}
