import { FetchBoardCommentsQuery } from 'commons/graphql/graphql'

export type CommentItem = FetchBoardCommentsQuery['fetchBoardComments'][number]

export interface CommentListItemProps {
  el: CommentItem
  boardId: string
}
