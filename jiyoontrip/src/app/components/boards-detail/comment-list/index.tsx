"use client";

import CommentItem from "../comment-list-item";
import useCommentList from "./hook";
import styles from "./styles.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

export default function CommentListComponent() {
  const { data, onNext, hasMore } = useCommentList();

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.commentList}>
            <InfiniteScroll
              dataLength={data?.fetchBoardComments.length ?? 0} //This is important field to render the next data
              next={onNext}
              hasMore={hasMore}
              loader={<h4>로딩중입니다....</h4>}
            >
              {data?.fetchBoardComments?.length === 0 ? (
                <div className={styles.nocomment}>등록된 댓글이 없습니다.</div>
              ) : (
                data?.fetchBoardComments
                  .slice()
                  .reverse()
                  .map((el) => <CommentItem key={el._id} el={el} />)
              )}
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </>
  );
}
