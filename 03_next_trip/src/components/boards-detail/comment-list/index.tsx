'use client';

import { FETCH_BOARD_COMMENTS } from '@/apis/graphql/boardComment.gql';
import { BoardComment } from '@/types/gql/graphql';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentItem from '../comment-item';

// export const FETCH_BOARDS = gql`
//   query FetchBoards($page: Int) {
//     fetchBoards(page: $page) {
//       _id
//       writer
//       title
//       contents
//       youtubeUrl
//       likeCount
//       dislikeCount
//       images
//       createdAt
//       updatedAt
//       deletedAt
//     }
//   }
// `;

export default function CommentList({
  boardId,
}: {
  boardId: string | string[];
}) {
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { data, fetchMore } = useQuery(FETCH_BOARD_COMMENTS, {
    variables: {
      boardId: String(boardId),
      page: 1,
    },
  });
  // const { data, fetchMore } = useQuery(FETCH_BOARDS);

  const onNext = () => {
    if (data === undefined) return;

    console.log('fetchMore variables:', { boardId, page });

    fetchMore({
      variables: {
        boardId: String(boardId),
        page: page + 1,
      },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.length) {
          setHasMore(false);
          return prev;
        }

        setPage((prevPage) => prevPage + 1);

        return {
          fetchBoardComments: [
            ...prev.fetchBoardComments,
            ...fetchMoreResult.fetchBoardComments,
          ],
        };
      },
    });
  };

  console.log(data && data.fetchBoardComments.length);
  return (
    <>
      <h1>page</h1>
      <InfiniteScroll
        dataLength={data?.fetchBoardComments.length ?? 0}
        hasMore={hasMore}
        next={onNext}
        loader={<div key={0}>Loading ...</div>}
      >
        <div className='content'>Content</div>
        {/* {data?.fetchBoardComments.map((el: Partial<Board>) => (
          <div
            key={el._id}
            style={{ border: '1px solid black', margin: '10px' }}
          >
            <div>작성자: {el.writer}</div>
            <div>제목: {el.title}</div>
            <div>내용: {el.contents}</div>
            <div>작성일: {el.createdAt}</div>
          </div>
        ))} */}
        {!data?.fetchBoardComments.length && (
          <div className='justify-start text-center text-sm font-normal leading-tight text-gray-600'>
            등록된 댓글이 없습니다.
          </div>
        )}
        {data?.fetchBoardComments &&
          data?.fetchBoardComments.map((props: BoardComment) => (
            <CommentItem key={props._id} {...props} />
          ))}
      </InfiniteScroll>
    </>
  );
}
