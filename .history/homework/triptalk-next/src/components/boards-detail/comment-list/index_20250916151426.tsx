'use client';
//댓글 목록

import Image from 'next/image';
import styles from './CommentList.module.css';
import useCommentList from './hooks';
import Star from '../comment-write/star';
import AllModal from '@/components/all-modal';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function CommentList({ boardId }) {
  const { data, onClickDeleteComment, modalOpen, modalMessage, closeModal } =
    useCommentList({ boardId });
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
