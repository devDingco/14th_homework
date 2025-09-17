"use client";

import styles from "./styles.module.css";

interface IBoardListProps {
  data: any;
  loading: boolean;
  error: any;
  currentPage: number;
  onClickTitle: (id: string) => void;
  onClickDelete: (id: string) => void;
  formatDate: (date: string) => string;
}

export default function BoardList({
  data,
  loading,
  error,
  currentPage,
  onClickTitle,
  onClickDelete,
  formatDate,
}: IBoardListProps) {
  if (loading) return <div>게시글 목록을 불러오는 중입니다...</div>;
  if (error)
    return (
      <div>
        오류가 발생했습니다: {error.message}
        <br />
        콘솔에서 상세 오류를 확인해주세요.
      </div>
    );

  return (
    <div className={styles.board}>
      <div className={styles.board_frame}>
        <div className={styles.board_body}>
          <div className={styles.board_list_frame}>
            <div className={styles.board_list}>
              <div className={styles.name}>
                <div className={styles.number}>번호</div>
                <div className={styles.title}>제목</div>
                <div className={styles.writer}>작성자</div>
                <div className={styles.createdat}>날짜</div>
              </div>
              <div className={styles.list}>
                {data?.fetchBoards.map((el: any, index: number) => (
                  <div
                    key={el._id}
                    className={styles.listItem}
                    onClick={() => onClickTitle(el._id)}
                  >
                    <div className={styles.name_written}>
                      <div className={styles.number_written}>
                        {(currentPage - 1) * 10 + index + 1}
                      </div>
                      <div className={styles.title}>{el.title}</div>
                      <div className={styles.writer}>{el.writer}</div>
                      <div className={styles.createdat_written}>
                        {formatDate(el.createdAt)}
                      </div>
                      <div className={styles.deleteButtonContainer}>
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            onClickDelete(el._id);
                          }}
                        >
                          <img src="/images/delete.png" alt="삭제" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* ✅ Pagination은 여기서 제거 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
