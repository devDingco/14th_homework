'use client';

import useCreateBoardComment from './hook';
import styles from './styles.module.css';
import { CommentVariables } from './types';
import { Rating } from '@mui/material';

export default function CommentWrite(props: CommentVariables) {
  // console.log('🚀 ~ CommentWrite ~ props:', props);
  const {
    writer,
    password,
    contents,
    rating,
    onChangeWriter,
    onChangePassword,
    onChangeContent,
    onChangeRating,
    onClickCommentSubmit,
    isFormValid,
    error,
  } = useCreateBoardComment(props);

  return (
    <div className={styles['commentLayout']}>
      <div className={styles['commentBody']}>
        <div className={styles['commentTop']}>
          {/* 수정 모드일 때 제목 변경 */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6.0385 17.5L4.0365 19.5018C3.752 19.7864 3.42475 19.8509 3.05475 19.6952C2.68492 19.5394 2.5 19.2589 2.5 18.8538V4.30775C2.5 3.80258 2.675 3.375 3.025 3.025C3.375 2.675 3.80258 2.5 4.30775 2.5H19.6923C20.1974 2.5 20.625 2.675 20.975 3.025C21.325 3.375 21.5 3.80258 21.5 4.30775V15.6923C21.5 16.1974 21.325 16.625 20.975 16.975C20.625 17.325 20.1974 17.5 19.6923 17.5H6.0385ZM5.4 16H19.6923C19.7693 16 19.8398 15.9679 19.9038 15.9038C19.9679 15.8398 20 15.7692 20 15.6923V4.30775C20 4.23075 19.9679 4.16025 19.9038 4.09625C19.8398 4.03208 19.7693 4 19.6923 4H4.30775C4.23075 4 4.16025 4.03208 4.09625 4.09625C4.03208 4.16025 4 4.23075 4 4.30775V17.3848L5.4 16Z"
              fill="#333333"
            />
          </svg>{' '}
          <span className={styles.text}>댓글</span>
        </div>
        <div className={styles.rank}>
          <Rating
            name="comment-rating"
            value={rating}
            onChange={onChangeRating}
            size="large"
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#ffd700',
              },
              '& .MuiRating-iconEmpty': {
                color: '#C7C7C7',
              },
            }}
          />
        </div>
        <div className={styles.commentMiddle}>
          <div className={styles.commentInfo}>
            <div className={styles['enroll-row']}>
              <div className={styles['enroll-form']}>
                <div className={styles['enroll-form-writer']}>
                  <div>작성자 </div>
                  <div className={styles['enroll-required-indicator']}>*</div>
                </div>
                <div>
                  <input
                    className={styles['enroll-input']}
                    type="text"
                    placeholder="작성자 명을 입력해 주세요."
                    value={writer}
                    onChange={onChangeWriter}
                    disabled={props.isEdit} // 수정 모드에서는 작성자 변경 불가
                    style={props.isEdit ? { backgroundColor: '#f5f5f5', color: '#999' } : {}}
                  />
                  {error.writer && <p className={styles.error}>{error.writer}</p>}
                </div>
              </div>
              <div className={styles['enroll-form']}>
                <div className={styles['enroll-form-writer']}>
                  <div>비밀번호 </div>
                  <div className={styles['enroll-required-indicator']}>*</div>
                </div>
                <div>
                  <input
                    className={styles['enroll-input']}
                    type="password"
                    placeholder="비밀번호를 입력해 주세요."
                    value={password}
                    onChange={onChangePassword}
                  />
                  {error.password && <p className={styles.error}>{error.password}</p>}
                </div>
              </div>
            </div>
            <div className={styles.commentInput}>
              {/* <div style={{ width: '100%' }}> */}
              <textarea
                className={styles.textarea}
                placeholder="댓글을 입력해 주세요."
                value={contents}
                onChange={onChangeContent}
              />
              {error.contents && <p className={styles.error}>{error.contents}</p>}
              <div className={styles.textCount}>0/100</div>
            </div>
          </div>
        </div>
        {props.isEdit ? (
          // 수정 모드일 때 취소/저장 버튼
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              alignSelf: 'stretch',
              gap: '16px',
            }}
          >
            {/* 취소 버튼 */}
            <button className={styles.cancelButton} onClick={props.onCancel}>
              <span className={styles.cancelText}>취소</span>
            </button>
            {/* 수정 버튼 */}
            <button
              className={styles.reviseButton}
              disabled={!isFormValid}
              onClick={() => {
                onClickCommentSubmit();
                props.onSave?.();
              }}
            >
              <span className={styles.buttonText}>수정 하기</span>
            </button>
          </div>
        ) : (
          // 일반 등록 모드일 때
          <button
            className={styles.commentButton}
            disabled={!isFormValid}
            onClick={onClickCommentSubmit}
          >
            <span className={styles.buttonText}>댓글 등록</span>
          </button>
        )}
      </div>
      <span className={styles.noCommentMs}>등록된 댓글이 없습니다.</span>
    </div>
  );
}
