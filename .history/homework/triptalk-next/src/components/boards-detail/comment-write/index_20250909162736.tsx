'use client';
import { gql } from '@apollo/client';
import styles from './CommentWrite.module.css';
import Image from 'next/image';

const FETCH_CREATE_COMMENT = gql`
mutation createBoardComment(
$createBoardCommentInput:CreateBoardCommentInput!
$boardId: ID!
)
  


`;

export default function CommentWrite() {
  return (
    <div className="container">
      <hr />
      <div className={styles.comment}>
        <Image src="/icons/chat.png" alt="아이콘" width={24} height={24} />
        <div>댓글</div>
      </div>
      <div className={styles.star}>별점</div>
      <div className={styles.commentContainer}>
        <div className={styles.commentInput}>
          <div>작성자</div>
          <input type="text" placeholder="작성자 명을 입력해 주세요" />
        </div>
        <div className={styles.commentInput}>
          <div>비밀번호</div>
          <input type="password" placeholder="비밀번호를 입력해 주세요." />
        </div>
      </div>
      <textarea
        placeholder="댓글을 입력해 주세요."
        className={styles.textInput}
      />
      <div className={styles.commentbutton}>
        <button>댓글 등록</button>
      </div>
      <hr />
      여기아래로 댓글목록임
    </div>
  );
}
