import { ChangeEvent, useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  CreateBoardCommentDocument,
  CreateBoardCommentMutation,
  CreateBoardCommentMutationVariables,
  FetchBoardCommentsDocument,
} from 'commons/graphql/graphql'
import { CommentWriteProps } from './types'

export default function useCommentWrite(props: CommentWriteProps) {
  const [createBoardComment] = useMutation<
    CreateBoardCommentMutation,
    CreateBoardCommentMutationVariables
  >(CreateBoardCommentDocument)

  const [writer, setWriter] = useState('')
  const [password, setPassword] = useState('')
  const [contents, setContents] = useState('')
  const [rating, setRating] = useState(0)

  const handleChangeWriter = (event: ChangeEvent<HTMLInputElement>) => {
    setWriter(event.target.value)
  }
  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleChangeContents = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContents(event.target.value)
  }
  // TODO: 별점 구현후 추가 예정
  const handleChangeRating = (event: any) => {
    setRating(event.target.value)
  }

  const handleSubmit = async () => {
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
          {
            query: FetchBoardCommentsDocument,
            variables: { boardId: props.boardId },
          },
        ],
      })
      setWriter('')
      setPassword('')
      setContents('')
      setRating(0)
    } catch (error) {
      console.error(error)
    }
  }
  return {
    handleChangeWriter,
    handleChangePassword,
    handleChangeContents,
    handleChangeRating,
    handleSubmit,
    writer,
    password,
    contents,
    rating,
  }
}
