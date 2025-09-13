'use client';

import useCommentList from './hook';
import styles from './styles.module.css';
import { BoardCommentVariables } from './types';
import { BoardComment } from '@/commons/graphql/graphql';
import { Rating } from '@mui/material';

export default function CommentList(props: BoardCommentVariables) {
  const { url, commentVariables, data, error } = useCommentList();

  // console.log('🚀 ~ CommentList ~ data:', data);

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

  // MUI Rating 컴포넌트로 별점 표시
  const renderStars = (rating: number) => {
    return (
      <Rating
        name="comment-rating-readonly"
        value={rating}
        readOnly
        size="small"
        sx={{
          '& .MuiRating-iconFilled': {
            color: '#ffd700',
          },
          '& .MuiRating-iconEmpty': {
            color: '#C7C7C7',
          },
        }}
      />
    );
  };

  return (
    <div className={styles.commentDetailLayout}>
      {data.fetchBoardComments.map((comment: BoardComment, index: number) => (
        <div key={comment._id || index}>
          <div className={styles.commentTop}>
            <div className={styles.writerRank}>
              <div className={styles.writerInfo}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect width="24" height="24" rx="12" fill="#E4E4E4" />
                  <path
                    d="M12 11.6924C11.0375 11.6924 10.2136 11.3497 9.52825 10.6644C8.84275 9.97888 8.5 9.15488 8.5 8.19238C8.5 7.22988 8.84275 6.40597 9.52825 5.72063C10.2136 5.03513 11.0375 4.69238 12 4.69238C12.9625 4.69238 13.7864 5.03513 14.4718 5.72063C15.1573 6.40597 15.5 7.22988 15.5 8.19238C15.5 9.15488 15.1573 9.97888 14.4718 10.6644C13.7864 11.3497 12.9625 11.6924 12 11.6924ZM4.5 17.7886V17.0846C4.5 16.595 4.633 16.1415 4.899 15.7241C5.165 15.3068 5.5205 14.986 5.9655 14.7616C6.95383 14.2771 7.95092 13.9137 8.95675 13.6714C9.96258 13.429 10.977 13.3079 12 13.3079C13.023 13.3079 14.0374 13.429 15.0433 13.6714C16.0491 13.9137 17.0462 14.2771 18.0345 14.7616C18.4795 14.986 18.835 15.3068 19.101 15.7241C19.367 16.1415 19.5 16.595 19.5 17.0846V17.7886C19.5 18.2103 19.3523 18.569 19.0568 18.8646C18.7613 19.1601 18.4026 19.3079 17.9808 19.3079H6.01925C5.59742 19.3079 5.23875 19.1601 4.94325 18.8646C4.64775 18.569 4.5 18.2103 4.5 17.7886ZM6 17.8079H18V17.0846C18 16.8821 17.9413 16.6946 17.824 16.5221C17.7067 16.3498 17.5474 16.2091 17.3462 16.1001C16.4846 15.6758 15.6061 15.3543 14.7107 15.1356C13.8153 14.9171 12.9117 14.8079 12 14.8079C11.0883 14.8079 10.1848 14.9171 9.28925 15.1356C8.39392 15.3543 7.51542 15.6758 6.65375 16.1001C6.45258 16.2091 6.29333 16.3498 6.176 16.5221C6.05867 16.6946 6 16.8821 6 17.0846V17.8079ZM12 10.1924C12.55 10.1924 13.0208 9.99655 13.4125 9.60488C13.8042 9.21322 14 8.74238 14 8.19238C14 7.64238 13.8042 7.17155 13.4125 6.77988C13.0208 6.38822 12.55 6.19238 12 6.19238C11.45 6.19238 10.9792 6.38822 10.5875 6.77988C10.1958 7.17155 10 7.64238 10 8.19238C10 8.74238 10.1958 9.21322 10.5875 9.60488C10.9792 9.99655 11.45 10.1924 12 10.1924Z"
                    fill="#777777"
                  />
                </svg>
                <span className={styles.writerFont}>{comment.writer}</span>
              </div>
              <div className={styles.rank}>{renderStars(comment.rating || 0)}</div>
            </div>
            <div className={styles.commentHandle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M4.16675 15.8327H5.218L13.7484 7.30227L12.6972 6.25102L4.16675 14.7814V15.8327ZM3.67008 17.0827C3.45661 17.0827 3.27772 17.0105 3.13341 16.866C2.98897 16.7217 2.91675 16.5428 2.91675 16.3293V14.8856C2.91675 14.6824 2.95578 14.4887 3.03383 14.3046C3.11175 14.1204 3.21911 13.9599 3.35591 13.8231L13.9088 3.27497C14.0348 3.16053 14.1739 3.07213 14.3261 3.00977C14.4785 2.94727 14.6382 2.91602 14.8053 2.91602C14.9724 2.91602 15.1342 2.94567 15.2907 3.00497C15.4474 3.06428 15.5861 3.15858 15.7067 3.28789L16.7245 4.31831C16.8538 4.439 16.9459 4.57789 17.0009 4.73497C17.0559 4.89206 17.0834 5.04914 17.0834 5.20622C17.0834 5.37386 17.0548 5.53379 16.9976 5.68602C16.9404 5.83838 16.8493 5.97754 16.7245 6.10352L6.17633 16.6435C6.03953 16.7803 5.87904 16.8877 5.69487 16.9656C5.51071 17.0437 5.31703 17.0827 5.11383 17.0827H3.67008ZM13.2136 6.78581L12.6972 6.25102L13.7484 7.30227L13.2136 6.78581Z"
                  fill="#333333"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 10.8779L5.77251 15.1056C5.65709 15.2209 5.51202 15.2799 5.3373 15.2827C5.16272 15.2853 5.01501 15.2263 4.89418 15.1056C4.77348 14.9848 4.71313 14.8384 4.71313 14.6664C4.71313 14.4945 4.77348 14.3481 4.89418 14.2273L9.12188 9.99977L4.89418 5.77227C4.7789 5.65685 4.71987 5.51178 4.71709 5.33706C4.71445 5.16247 4.77348 5.01477 4.89418 4.89393C5.01501 4.77324 5.1614 4.71289 5.33334 4.71289C5.50529 4.71289 5.65168 4.77324 5.77251 4.89393L10 9.12164L14.2275 4.89393C14.3429 4.77865 14.488 4.71963 14.6627 4.71685C14.8373 4.71421 14.985 4.77324 15.1058 4.89393C15.2265 5.01477 15.2869 5.16115 15.2869 5.3331C15.2869 5.50504 15.2265 5.65143 15.1058 5.77227L10.8781 9.99977L15.1058 14.2273C15.2211 14.3427 15.2801 14.4878 15.2829 14.6625C15.2856 14.8371 15.2265 14.9848 15.1058 15.1056C14.985 15.2263 14.8386 15.2866 14.6667 15.2866C14.4947 15.2866 14.3483 15.2263 14.2275 15.1056L10 10.8779Z"
                  fill="#333333"
                />
              </svg>
            </div>
          </div>
          <div className={styles.commentFont} style={{ whiteSpace: 'pre-wrap' }}>
            {comment.contents}
          </div>
          <div className={styles.dateFont}>
            {comment.createdAt
              ? new Date(comment.createdAt).toLocaleDateString('ko-KR')
              : '날짜 없음'}
          </div>
          <div className={styles.borderLine}></div>
        </div>
      ))}
    </div>
  );
}
