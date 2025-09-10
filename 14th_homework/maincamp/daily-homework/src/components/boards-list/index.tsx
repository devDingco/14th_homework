'use client';

import useMapBoardsDeletePage from './hooks';
import styles from './styles.module.css';

export default function MapBoardsDeletePage() {
  const { data, deleteBoard, onClickDelete, number, router } = useMapBoardsDeletePage();

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
                  {data?.fetchBoards.map((el: Board, index: number) => {
                    return (
                      <div key={index}>
                        <div
                          className={styles.post_info}
                          onClick={() => router.push(`/boards/${el._id}`)}
                        >
                          <span style={{ color: '#919191' }}>{number - index}</span>
                          <span style={{ color: '#1C1C1C' }}>{el.title}</span>
                          <span style={{ color: '#333' }}>{el.writer}</span>
                          <span style={{ color: '#919191' }}></span>
                          <span>
                            <button onClick={() => onClickDelete(el._id || '')}>삭제</button>
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
