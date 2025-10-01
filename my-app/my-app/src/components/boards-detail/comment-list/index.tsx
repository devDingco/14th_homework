"use client";

// import Image from "next/image";
// import styles from "./styles.module.css";
// import { gql, useMutation, useQuery } from "@apollo/client";
// import { useState } from "react";
// import { useParams } from "next/navigation";

import { useCommentList } from "./hook";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentListItem from "../comment-list-item";

export default function CommentList() {
  const { data, fetchMore, isHasMore, setIsHasMore } = useCommentList();

  const onNext = () => {
    if (data === undefined) return; // 데이터가 없으면 아래 실행하지않고 리턴으로 끝내기

    fetchMore({
      variables: {
        page: Math.ceil((data?.fetchBoardComments.length ?? 10) / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchBoardComments?.length === 0) {
          setIsHasMore(false);
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
    <>
      <InfiniteScroll
        dataLength={data?.fetchBoardComments.length ?? 0}
        hasMore={isHasMore}
        next={onNext}
        loader={<div>로딩중입니다.</div>}
      >
        {data?.fetchBoardComments.map((el, index) => (
          <CommentListItem
            key={index}
            el={el}
            index={index}
            length={data?.fetchBoardComments.length ?? 0}
          />
        ))}
      </InfiniteScroll>
    </>
  );
}
