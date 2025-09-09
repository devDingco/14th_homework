'use client';
//댓글 등록

import styles from './CommentWrite.module.css';
import Image from 'next/image';
import useCommentWrite from './hooks';

export default function CommentWrite() {
  const {
    name,
    password,
    contents,
    rating,
    setName,
    setPassword,
    setContents,
    setrating,
    onClickCommentSubmit
  } = useCommentWrite();
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
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="작성자 명을 입력해 주세요"
          />
        </div>
        <div className={styles.commentInput}>
          <div>비밀번호</div>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="비밀번호를 입력해 주세요."
          />
        </div>
      </div>
      <textarea
        value={contents}
        onChange={(e) => setContents(e.target.value)}
        placeholder="댓글을 입력해 주세요."
        className={styles.textInput}
      />
      <div className={styles.commentbutton}>
        <button onClick={onClickCommentSubmit}>댓글 등록</button>
      </div>
    </div>
  );
}
