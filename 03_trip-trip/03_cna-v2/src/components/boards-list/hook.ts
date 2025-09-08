import { useMutation, useQuery } from '@apollo/client'
import { DELETE_BOARD, FETCH_BOARDS } from 'components/queries'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import { BoardListProps } from './types'

export default function useBoardsList(props: BoardListProps) {
  const [deleteBoard] = useMutation(DELETE_BOARD)

  const router = useRouter()
  const onClickDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await deleteBoard({
        variables: { boardId: props.hoveredId },
        refetchQueries: [{ query: FETCH_BOARDS }],
      })
      console.log('삭제 성공:', response.data.deleteBoard.message)
    } catch (err) {
      console.error('삭제실패')
    }
  }

  const onClickDetail = async (event: MouseEvent<HTMLButtonElement>, id: String) => {
    event.stopPropagation()

    router.push(`/boards/${id}`)
  }

  return {
    onClickDelete,
    onClickDetail,
  }
}
