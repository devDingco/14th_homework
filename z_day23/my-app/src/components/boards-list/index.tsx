import { useBoardList } from "./hook";
import styles from "./styles.module.css";
import React from "react";

export default function BoardList() {
  const { data, onClickDelete, onClickTitle, formatDate, loading, error } =
    useBoardList();

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
    <>
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
                  {data?.fetchBoards.map((el, index: number) => (
                    <div key={el._id} className={styles.listItem}>
                      <div className={styles.name_written}>
                        <div className={styles.number_written}>{index + 1}</div>
                        <div
                          className={styles.title}
                          onClick={() => onClickTitle(el._id)}
                        >
                          {el.title}
                        </div>
                        <div className={styles.writer}>{el.writer}</div>
                        <div className={styles.createdat_written}>
                          {formatDate(el.createdAt)}
                        </div>
                        <div className={styles.deleteButtonContainer}>
                          <button onClick={() => onClickDelete(el._id)}>
                            <img src="/images/delete.png" alt="삭제" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
