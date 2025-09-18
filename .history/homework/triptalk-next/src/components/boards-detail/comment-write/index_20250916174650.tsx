'use client';
//댓글 등록

import styles from './CommentWrite.module.css';
import Image from 'next/image';
import useCommentWrite from './hooks';
import Star from './star';
import AllModal from '../../all-modal';

export default function CommentWrite({
  isEdit = false,
  comment,
  onEditComplete,
}) {
  const {
    name,
    password,
    contents,
    rating,
    setName,
    setPassword,
    setContents,
    setrating,
    onClickCommentSubmit,
    onClickCancel,
    modalOpen,
    setModalOpen,
    modalMessage,
    isButtonDisabled,
  } = useCommentWrite({ isEdit, comment, onEditComplete });
  return (
    <div className="container">
      <hr />
      <div className={styles.comment}>
        <Image src="/icons/chat.png" alt="아이콘" width={24} height={24} />
        <div>댓글</div>
      </div>
      <div className={styles.star}>
        <Star rating={rating} onChange={setrating} />
      </div>
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
      <div
        style={{
          display: 'flex',
          gap: '8px',
          justifyContent: 'flex-end',
          alignItems: end,
        }}
      >
        {isEdit && (
          <div className={styles.commentbutton}>
            <button onClick={onClickCancel}>취소</button>
          </div>
        )}
        <div
          className={`${styles.commentbutton} ${
            !isButtonDisabled ? styles.commentbuttonActive : ''
          }`}
        >
          <button onClick={onClickCommentSubmit} disabled={isButtonDisabled}>
            {isEdit ? '댓글 수정' : '댓글 등록'}
          </button>
        </div>
      </div>

      <AllModal
        open={modalOpen}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
