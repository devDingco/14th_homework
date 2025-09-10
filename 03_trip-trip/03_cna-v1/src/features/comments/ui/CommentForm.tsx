import { ChatIcon } from '@/assets/icons'
import styles from './CommentForm.module.css'
import CustomButton from '@/shared/ui/CustomButton/CustomButton'
import { ApolloError, useMutation } from '@apollo/client'
import {
  CreateBoardCommentDocument,
  CreateBoardCommentMutation,
  CreateBoardCommentMutationVariables,
  FetchBoardCommentsDocument,
} from '@/shared/api/graphql/graphql'
import { ChangeEvent, FormEvent, useState } from 'react'

export interface CommentFormProps {
  boardId: string
}

export interface CommentForm {
  writer: string
  password: string
  contents: string
  rating: number
}

export type HandleSubmit = (event: FormEvent<HTMLFormElement>) => void

export default function CommentForm(props: CommentFormProps) {
  const initialCommentValues = {
    writer: '',
    password: '',
    contents: '',
    rating: 0,
  }
  const [comment, setComment] = useState(initialCommentValues)

  const handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target

    setComment({
      ...comment,
      [name]: value,
    })
  }

  const [createBoardComment] = useMutation<
    CreateBoardCommentMutation,
    CreateBoardCommentMutationVariables
  >(CreateBoardCommentDocument)

  const handleSubmit: HandleSubmit = async (event) => {
    event.preventDefault()
    const { writer, password, contents, rating } = comment
    try {
      const { data } = await createBoardComment({
        variables: {
          createBoardCommentInput: {
            writer,
            password,
            contents,
            rating,
          },
          boardId: props.boardId,
        },
        refetchQueries: [
          { query: FetchBoardCommentsDocument, variables: { boardId: props.boardId } },
        ],
      })
      setComment(initialCommentValues)
      console.log('🚀 ~ handleSubmit ~ data:', data)
    } catch (error) {
      if (error instanceof ApolloError) {
        alert(error.message)
      }
    }
  }

  const isDisabled = !comment.writer || !comment.password || !comment.contents
  console.log('🚀 ~ CommentForm ~ isDisabled:', isDisabled)

  return (
    <div className={styles['comment-form-layout']}>
      <div className={styles['comment-form-title']}>
        <ChatIcon />
        <p>댓글</p>
      </div>
      <div>대충 별점 들어가는 곳 {comment.rating}</div>
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
