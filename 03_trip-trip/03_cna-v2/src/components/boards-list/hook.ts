import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { BoardListProps } from './types'
import {
  DeleteBoardDocument,
  DeleteBoardMutation,
  DeleteBoardMutationVariables,
  FetchBoardsDocument,
} from 'commons/graphql/graphql'

export default function useBoardsList(props: BoardListProps) {
  const [deleteBoard] = useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(
    DeleteBoardDocument
  )

  const router = useRouter()
  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    try {
      const response = await deleteBoard({
        variables: { boardId: props.hoveredId },
        refetchQueries: [{ query: FetchBoardsDocument }],
      })
      console.log('삭제 성공:', response?.data?.deleteBoard?.message)
    } catch (err) {
      console.error('삭제실패')
    }
  }

  const onClickDetail = async (event: MouseEvent<HTMLButtonElement>, id: String) => {
    router.push(`/boards/${id}`)
  }

  return {
    onClickDelete,
    onClickDetail,
  }
}
