"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_BOARD_COMMENTS } from "./queries";
import styles from "./styles.module.css";
import Image from "next/image";
import { Rate } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";
import CommentListItem from "../comment-list-item";

export default function CommentList() {
  const board_params = useParams();
  const { data, fetchMore } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: { boardId: board_params.boardId },
  });
  const [hasMore, setHasMore] = useState(true);
  const onNext = () => {
    fetchMore({
      variables: { page: Math.ceil(data.fetchBoardComments.length / 10) + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.length) {
          setHasMore(false);
          return { fetchBoardComments: [...prev.fetchBoardComments] };
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
    <div
      id="scrollableDiv"
      style={{
        height: "500px", // 원하는 높이
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <InfiniteScroll
        dataLength={data?.fetchBoardComments.length ?? 0}
        loader={<div>로딩중</div>}
        hasMore={hasMore}
        next={onNext}
        style={{ overflow: "fit" }}
      >
        {data?.fetchBoardComments.map((el) => (
          <CommentListItem key={el._id} commentId={el._id} el={el} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
