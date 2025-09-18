'use client';
//댓글 목록

import Image from 'next/image';
import styles from './CommentList.module.css';
import useCommentList from './hooks';
import Star from '../comment-write/star';
import AllModal from '@/components/all-modal';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_BOARD_COMMENTS } from './queries';
import { updateWrappedQueryRef } from '@apollo/client/react/internal';

export default function CommentList({ boardId }) {
  const { data, onClickDeleteComment, modalOpen, modalMessage, closeModal } =
    useCommentList({ boardId });

  const [hasMore, setHasMore] = useState(true);
  const { data, fetchMore } = useQuery(FETCH_BOARD_COMMENTS);

  const onNext = () => {
    if (data === undefined) return;
    fetchMore({
      variables: {
        page: Math.ceil(data.fetchBoardComments.length ?? 10 / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult.fetchBoardComments?.legnth) {
          setHasMore(false);
          return;
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
              <div key={el._id}>
                <div className={styles.comment}>
                  <div className={styles.commentWriter}>
                    <Image
                      src="/icons/profile.png"
                      alt="사람아이콘"
                      width={24}
                      height={24}
                    />
                    <div>
                      <span>{el.writer}</span>
                    </div>
                    <div>
                      <Star rating={el.rating} disabled={true} />
                    </div>
                  </div>
                  <div>
                    <button>
                      <Image
                        src="/icons/edit.png"
                        alt="수정"
                        width={20}
                        height={20}
                      />
                    </button>
                    <button
                      id={el._id} // 버튼의 id를 게시글 ID로 설정 */}
                      onClick={onClickDeleteComment}
                    >
                      <Image
                        src="/icons/close.png"
                        alt="삭제"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>

                <div className={styles.commentContents}>
                  <span>{el.contents}</span>
                </div>
                <span>
                  {/* 작성일을 한국 날짜 형식으로 변환 */}
                  {new Date(el.createdAt).toLocaleDateString('ko-KR')}
                </span>
                <hr className={styles.hr} />
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
      <AllModal open={modalOpen} message={modalMessage} onClose={closeModal} />
    </div>
  );
}
