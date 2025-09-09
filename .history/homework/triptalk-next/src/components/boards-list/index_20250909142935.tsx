'use client';
//게시글 목록 페이지
import Image from 'next/image';
import styles from './page.module.css';
import useBoardsList from './hooks';

export default function BoardsList() {
  const { data, onClickTitle, onClickDelete } = useBoardsList();

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
        {data?.fetchBoards?.map((el, index: number) => {
          return (
            <div
              key={el._id}
              className={styles.postItem}
              onClick={() => onClickTitle(el._id)}
            >
              {/* 각 게시글 항목 */}
              {/* 왼쪽 부분: 번호와 제목 */}
              <div className={styles.leftGroup}>
                <span>{index + 1}</span> {/* 게시글 번호 (배열 인덱스 + 1) */}
                <span
                // 제목 클릭 시 상세 페이지로 이동
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
    </div>
  );
}
