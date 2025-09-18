"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { IComment, ICommentListProps } from "./types";
import { useCommentList } from "./hook";
import styles from "../detail/styles.module.css";
import CommentListItem from "../comment-list-item";

export default function CommentList({ boardId }: ICommentListProps) {
  const [hasMore, setHasMore] = useState(true);
  const { data, loading, error, fetchMore, refetch } = useCommentList(boardId);

  if (loading) return <div>댓글 목록을 불러오는 중입니다...</div>;
  if (error) return <div>댓글 목록을 불러오는 데 실패했습니다.</div>;

  const onNext = () => {
    if (!data) return;

    fetchMore({
      variables: {
        page: Math.ceil((data.fetchBoardComments?.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult?.fetchBoardComments?.length) {
          setHasMore(false);
          return prev;
        }

        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  return (
    <div className={styles.boards}>
      <div className={styles.boards_body}>
        <InfiniteScroll
          dataLength={data?.fetchBoardComments.length ?? 0}
          hasMore={hasMore}
          next={onNext}
          loader={<div>로딩중입니다...</div>}
        >
          {data?.fetchBoardComments?.length === 0 ? (
            <div>등록된 댓글이 없습니다.</div>
          ) : (
            data?.fetchBoardComments.map((comment: IComment) => (
              <CommentListItem
                key={comment._id}
                comment={comment}
                boardId={boardId}
                refetchComments={refetch}
              />
            ))
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}
