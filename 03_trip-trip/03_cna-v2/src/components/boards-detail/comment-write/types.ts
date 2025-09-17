import { CommentItem } from '../comment-list-item/types'

export interface CommentWriteProps {
  isEdit?: boolean
  onClickEdit?: () => void
  boardId: string
  el?: CommentItem
}

export type UseCommentWriteProps = {
  boardId: string
  onClickEdit?: () => void
  el?: CommentItem
}
