import { useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { BoardListHookProps } from './types'
import {
  DeleteBoardDocument,
  DeleteBoardMutation,
  DeleteBoardMutationVariables,
  FetchBoardsDocument,
} from 'commons/graphql/graphql'

export default function useBoardsList(props: BoardListHookProps) {
  const [deleteBoard] = useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(
    DeleteBoardDocument
  )

  const router = useRouter()
  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    try {
      await deleteBoard({
        variables: { boardId: props.hoveredId },
        refetchQueries: [{ query: FetchBoardsDocument, variables: { search: '' } }],
      })
      console.log('삭제 성공')
    } catch (err) {
      console.error('삭제실패')
    }
  }

  const onClickDetail = async (event: MouseEvent<HTMLButtonElement>, id: string) => {
    router.push(`/boards/${id}`)
  }

  return {
    onClickDelete,
    onClickDetail,
  }
}
