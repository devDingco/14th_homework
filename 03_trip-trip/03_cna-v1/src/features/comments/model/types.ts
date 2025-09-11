import { FormEvent } from 'react'

export interface CommentFormProps {
  boardId: string
}

export interface CommentListProps {
  boardId: string
}

export interface CommentForm {
  writer: string
  password: string
  contents: string
  rating: number
}

export type HandleSubmit = (event: FormEvent<HTMLFormElement>) => void

export const initialCommentValues: CommentForm = {
  writer: '',
  password: '',
  contents: '',
  rating: 0,
}
