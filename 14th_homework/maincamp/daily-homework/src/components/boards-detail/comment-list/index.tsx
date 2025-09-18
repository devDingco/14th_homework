'use client';

import CommentItem from '../comment-list-item';
import useCommentList from './hook';
import styles from './styles.module.css';
import { BoardCommentVariables } from './types';
import { BoardComment } from '@/commons/graphql/graphql';
import { Rating } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';

interface BoardCommentsData {
  data?: BoardComment;
}

interface FetchBoardCommentsData {
  fetchBoardComments: BoardCommentsData[];
}

export default function CommentList(props: BoardCommentVariables) {
  const { data, error, hasMore, loadMoreComments } = useCommentList();

  // 디버깅용 로그
  console.log('🚀 ~ CommentList ~ data:', data);
  console.log('🚀 ~ CommentList ~ hasMore:', hasMore);
  console.log('🚀 ~ CommentList ~ 댓글 개수:', data?.fetchBoardComments?.length);

  if (!data) {
    return <div className={styles.commentDetailLayout}>댓글을 불러오는 중...</div>;
  }

  if (error) {
    console.error('댓글 불러오기 에러:', error);
    return <div className={styles.commentDetailLayout}>댓글을 불러오는데 실패했습니다.</div>;
  }

  // 댓글이 하나도 없는 경우
  if (!data.fetchBoardComments || data.fetchBoardComments.length === 0) {
    return (
      <div className={styles.commentDetailLayout}>
        <span className={styles.noCommentMs}>등록된 댓글이 없습니다.</span>
      </div>
    );
  }

  // 무한 스크롤이 트리거될 때 호출되는 함수
  const onNext = () => {
    loadMoreComments();
  };

  return (
    <div className={styles.commentDetailLayout}>
      <InfiniteScroll
        dataLength={data?.fetchBoardComments?.length ?? 0}
        hasMore={hasMore}
        next={onNext}
        loader={
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              color: '#666', // 진한 회색
              fontSize: '14px',
            }}
          >
            댓글을 불러오는 중...
          </div>
        }
        endMessage={
          <div
            style={{
              textAlign: 'center',
              padding: '20px',
              color: '#999', // 밝은 회색
              fontSize: '14px',
            }}
          >
            모든 댓글을 불러왔습니다.
          </div>
        }
      >
        {data?.fetchBoardComments.map((comment: BoardComment, index: number) => (
          <CommentItem
            key={comment._id ? `comment-${comment._id}` : `comment-index-${index}`}
            comment={comment}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
