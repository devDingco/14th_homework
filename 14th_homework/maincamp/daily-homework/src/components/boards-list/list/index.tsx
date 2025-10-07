'use client';

import useNewBoardsPage from './hooks';
import styles from './styles.module.css';
import { Board } from '@/commons/graphql/graphql';
import { Props } from './types';

export default function NewBoardsPage({ data, refetch, currentPage, totalCount }: Props) {
  const { deleteBoard, onClickDelete, router } = useNewBoardsPage(refetch);

  return (
    <div className={styles.layout}>
      <div className={styles.layout2}>
        <div className={styles.body}>
          <div className={styles.board}>
            <div className={styles.boardList}>
              <div className={styles.list}>
                <div className={styles.name}>
                  <span style={{ width: '64px', height: '20px' }}>번호</span>
                  <span style={{ width: '848px', height: '20px' }}>제목</span>
                  <span style={{ width: '100px', height: '20px' }}>작성자</span>
                  <span style={{ width: '100px', height: '20px' }}>날짜</span>
                </div>
                <div className={styles.post}>
                  {data?.fetchBoards.map((el: Board, index: number) => {
                    return (
                      <div style={{width: '100%'}} key={index}>
                        <div 
                          className={styles.post_info}
                          onClick={() => router.push(`/boards/${el._id}`)}
                        >
                          <span style={{ color: '#919191', width: '64px', height: '20px' }}>
                            {/* 게시글 번호 계산 */}
                            {totalCount - (currentPage - 1) * 10 - index}
                          </span>
                          <span style={{ color: '#1C1C1C', width: '848px', height:'20px' }}>{el.title}</span>
                          <span style={{ color: '#333',width: '100px', height: '20px' }}>{el.writer}</span>
                          <span style={{ color: '#919191' ,width: '100px', height: '20px'}}>123{/* 날짜 표시 영역 */}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onClickDelete(el._id || '');
                              }}
                              style={{
                                width: '24px',
                                height: '24px',
                                background: 'none',
                                border: '1px solid #ddd',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                fontSize: '12px',
                                cursor: 'pointer',
                                color: '#666',
                              }}
                            >
                              삭제
                            </button>
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
