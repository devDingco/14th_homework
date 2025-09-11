import { ChatIcon } from '@/assets/icons'
import styles from './CommentForm.module.css'
import CustomButton from '@/shared/ui/CustomButton/CustomButton'
import { CommentFormProps } from '../model/types'
import useForm from '../hooks/useCommentForm'
import { Rate } from 'antd'

export default function CommentForm(props: CommentFormProps) {
  const { comment, handleChange, setRating, handleSubmit, isDisabled } = useForm({
    boardId: props.boardId,
  })

  return (
    <div className={styles['comment-form-layout']}>
      <div className={styles['comment-form-title']}>
        <ChatIcon />
        <p>댓글</p>
      </div>
      <Rate onChange={setRating} value={comment.rating} />
      <form onSubmit={handleSubmit}>
        <div className={styles['post-form-col']}>
          {/* 작성자 */}
          <div className={styles['post-form-input']}>
            <div>
              <label>작성자</label>
              <span>*</span>
            </div>

            <input
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              name="writer"
              onChange={handleChange}
              value={comment.writer}
            />
          </div>

          {/* 비밀번호 */}
          <div className={styles['post-form-input']}>
            <div>
              <label>비밀번호</label>
              <span>*</span>
            </div>

            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              name="password"
              onChange={handleChange}
              value={comment.password}
            />
          </div>
        </div>
        <div className={`${styles['post-form-input']} ${styles['comment-contents']}`}>
          <textarea
            placeholder="내용을 입력해 주세요."
            name="contents"
            onChange={handleChange}
            value={comment.contents}
          />
          <p className={styles['comment-contents-len']}>{0}/100</p>
        </div>
        <CustomButton type={'submit'} content={'댓글 등록'} color={'blue'} disabled={isDisabled} />
      </form>
    </div>
  )
}
