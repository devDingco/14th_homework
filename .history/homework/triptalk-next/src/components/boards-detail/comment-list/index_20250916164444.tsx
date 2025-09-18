'use client';
//댓글 목록

import Image from 'next/image';
import styles from './CommentList.module.css';
import useCommentList from './hooks';
import Star from '../comment-write/star';
import AllModal from '@/components/all-modal';
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
            return (
              
          })}
        </InfiniteScroll>
      </div>
      <AllModal open={modalOpen} message={modalMessage} onClose={closeModal} />
    </div>
  );
}
