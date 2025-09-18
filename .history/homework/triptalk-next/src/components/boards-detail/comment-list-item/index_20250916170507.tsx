'use client';
import Image from 'next/image';
import styles from './CommentList.module.css';
import Star from '../comment-write/star';

export default function CommentListItem({ comment, onClickDeleteComment }) {
  const OnChangeEdit = () => {};
  return (
    <div key={comment._id}>
      <div className={styles.comment}>
        <div className={styles.commentWriter}>
          <Image
            src="/icons/profile.png"
            alt="사람아이콘"
            width={24}
            height={24}
          />
          <div>
            <span>{comment.writer}</span>
          </div>
          <div>
            <Star rating={comment.rating} disabled={true} />
          </div>
        </div>
        <div>
          <button onClick={OnChangeEdit}>
            <Image src="/icons/edit.png" alt="수정" width={20} height={20} />
          </button>
          <button
            id={comment._id} // 버튼의 id를 게시글 ID로 설정 */}
            onClick={onClickDeleteComment}
          >
            <Image src="/icons/close.png" alt="삭제" width={20} height={20} />
          </button>
        </div>
      </div>

      <div className={styles.commentContents}>
        <span>{comment.contents}</span>
      </div>
      <span>
        {/* 작성일을 한국 날짜 형식으로 변환 */}
        {new Date(comment.createdAt).toLocaleDateString('ko-KR')}
      </span>
      <hr className={styles.hr} />
    </div>
  );
}
