import { ApolloError, useMutation } from '@apollo/client'
import {
  CreateBoardCommentDocument,
  CreateBoardCommentMutation,
  CreateBoardCommentMutationVariables,
  FetchBoardCommentsDocument,
} from '@/shared/api/graphql/graphql'
import { ChangeEvent, useState } from 'react'
import { CommentFormProps, HandleSubmit, initialCommentValues } from '../model/types'

export default function useForm(props: CommentFormProps) {
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

  const setRating = (value: number) => {
    setComment({ ...comment, rating: value })
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
      } else {
        alert(`에러에러`)
      }
    }
  }

  const isDisabled = !comment.writer || !comment.password || !comment.contents || !comment.rating

  return {
    comment,
    handleChange,
    handleSubmit,
    setRating,
    isDisabled,
  }
}
