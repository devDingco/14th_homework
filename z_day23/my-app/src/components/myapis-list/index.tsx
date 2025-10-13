"use client";

import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";
import { useBoardsList } from "./hooks";
import styles from "./styles.module.css";

export default function MyapisList() {
  const {
    boards,
    loading,
    error,
    hasMore,
    fetchMoreData,
    onClickDelete,
    router,
  } = useBoardsList();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>나만의 콘텐츠 목록</h1>
      <Link href="/myapis/new" className={styles.addButton}>
        + 새 게시글 등록
      </Link>
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={styles.listContainer}>
        {boards.length === 0 && !loading && !error ? (
          <div className={styles.noData}>아직 등록된 게시글이 없습니다.</div>
        ) : (
          <InfiniteScroll
            dataLength={boards.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<div className={styles.loader}>로딩중...</div>}
            endMessage={
              <div className={styles.endMessage}>
                모든 게시글을 불러왔습니다.
              </div>
            }
            className={styles.scrollContainer}
          >
            {boards.map((board) => (
              <div key={board.id} className={styles.listItem}>
                <Link href={`/myapis/${board.id}`} className={styles.itemLink}>
                  <div className={styles.itemTitle}>{board.title}</div>
                  <div className={styles.itemWriter}>
                    작성자: {board.writer}
                  </div>
                </Link>
                <div className={styles.itemActions}>
                  <Link
                    href={`/myapis/${board.id}/edit`}
                    className={styles.actionButton}
                  >
                    수정
                  </Link>
                  <button
                    onClick={() => onClickDelete(board.id)}
                    className={styles.actionButton}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        )}
      </div>
    </div>
  );
}
