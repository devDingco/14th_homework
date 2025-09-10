'use client'
import { useMutation, useQuery } from '@apollo/client'
import styles from './styles.module.css'
import { DeleteIcon } from '@/assets/icons'
import { formatUtcToKstYmd } from '@/shared/lib/date/formatUtcToKstYmd'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'
import {
  DeleteBoardDocument,
  DeleteBoardMutation,
  DeleteBoardMutationVariables,
  FetchBoardsCountDocument,
  FetchBoardsCountQuery,
  FetchBoardsCountQueryVariables,
  FetchBoardsDocument,
  FetchBoardsQuery,
  FetchBoardsQueryVariables,
} from '@/shared/api/graphql/graphql'

export default function BoardsPage() {
  const router = useRouter()
  const { data, loading, error } = useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(
    FetchBoardsDocument
  )
  const { data: board_num } = useQuery<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>(
    FetchBoardsCountDocument
  )
  const [deleteBoard] = useMutation<DeleteBoardMutation, DeleteBoardMutationVariables>(
    DeleteBoardDocument
  )

  if (loading) return <div>로딩중입니다</div>
  if (error || !data?.fetchBoards) return <div>게시글을 찾을 수 없습니다.</div>

  const boardNumber =
    typeof board_num?.fetchBoardsCount === 'number' ? board_num?.fetchBoardsCount : 0

  const handleNavigate = (id: string) => {
    router.push(`/boards/${id}`)
  }

  const handleDelete = async (event: MouseEvent<SVGSVGElement>, id: string) => {
    event.stopPropagation()
    await deleteBoard({
      variables: {
        boardId: id,
      },
      refetchQueries: [{ query: FetchBoardsDocument }, { query: FetchBoardsCountDocument }],
    })
  }

  return (
    <div className={styles['board-list-container']}>
      <div className={`${styles['board-list']} ${styles['board-title']}`}>
        <p>번호</p>
        <p>제목</p>
        <p>작성자</p>
        <p>날짜</p>
      </div>

      <div className={styles['board-list-items']}>
        {data?.fetchBoards.map((boardListItem, idx) => {
          const { _id, writer, title, createdAt } = boardListItem
          const formattedDate = formatUtcToKstYmd(createdAt)

          return (
            <div
              className={`${styles['board-list']} ${styles['board-list-item']}`}
              key={_id}
              onClick={() => handleNavigate(_id)}
            >
              <p>{boardNumber - idx}</p>
              <p>{title}</p>
              <p>{writer}</p>
              <p>{formattedDate}</p>
              <DeleteIcon
                onClick={(event: MouseEvent<SVGSVGElement>) => {
                  handleDelete(event, _id)
                  alert(`${boardNumber - idx}번째 게시글이 삭제되었습니다.`)
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
