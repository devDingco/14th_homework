'use client';
import CommentListItem from '../comment-list-item';
//댓글 목록

import useCommentList from './hooks';

import InfiniteScroll from 'react-infinite-scroll-component';

export default function CommentList({ boardId }) {
  const {
    data,
    hasMore,
    onNext,
    onClickDeleteComment,
    modalOpen,
    modalMessage,
    closeModal,
  } = useCommentList({ boardId });
  return (
    <div className="container">
      <div>
        <InfiniteScroll
          dataLength={data?.fetchBoardComments.length ?? 0}
          hasMore={hasMore}
          next={onNext}
          loader={<div>로딩중입니다</div>}
        >
          {data?.fetchBoardComments?.map((el, index: number) => {
            <AllModal
              open={modalOpen}
              message={modalMessage}
              onClose={closeModal}
            />;
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
}
