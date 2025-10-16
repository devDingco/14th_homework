'use client';

import useBoardListPage from './hooks';
import styles from './styles.module.css';
import { Board } from '@/commons/graphql/graphql';
import { Props } from './types';

export default function BoardListPage({ data, refetch, currentPage, totalCount, keyword }: Props) {
  const { deleteBoard, onClickDelete, router } = useBoardListPage(refetch);

  return (
    <div className={styles.layout}>
      <div className={styles.boardList}>
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
                <div
                  key={index}
                  className={styles.post_info}
                  onClick={() => router.push(`/boards/${el._id}`)}
                >
                  <span>{totalCount - (currentPage - 1) * 10 - index}</span>
                  <span>
                    {el.title
                      .replaceAll(keyword, `#$${keyword}#$`)
                      .split('#$')
                      .map((el, index) => (
                        <span
                          key={`${el}_${index}`}
                          style={{ color: el === keyword ? 'red' : 'inherit' }}
                        >
                          {el}
                        </span>
                      ))}
                  </span>
                  <span>{el.writer}</span>
                  <span>2024.12.16</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
