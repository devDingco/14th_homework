'use client'
import { useMutation, useQuery } from '@apollo/client'
import styles from './styles.module.css'
import { DeleteIcon } from '@/assets/icons'
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from '@/features/boards/api/query'
import { formatUtcToKstYmd } from '@/shared/lib/date/formatUtcToKstYmd'
import { useRouter } from 'next/navigation'
import { DELETE_BOARD } from '@/features/boards/api/mutation'
import { MouseEvent } from 'react'

interface boardListItem {
  _id: string
  writer: string
  title: string
  createdAt: string
}
export default function BoardsPage() {
  const router = useRouter()
  const { data, loading, error } = useQuery(FETCH_BOARDS)
  const { data: board_num } = useQuery(FETCH_BOARDS_COUNT)
  const [deleteBoard] = useMutation(DELETE_BOARD)

  if (loading) return <div>로딩중입니다</div>
  if (error || !data.fetchBoards) return <div>게시글을 찾을 수 없습니다.</div>

  const boardNumber = board_num?.fetchBoardsCount

  const handleNavigate = (id: string) => {
    router.push(`/boards/${id}`)
  }

  const handleDelete = async (event: MouseEvent<SVGSVGElement>, id: string) => {
    event.stopPropagation()
    await deleteBoard({
      variables: {
        boardId: id,
      },
      refetchQueries: [{ query: FETCH_BOARDS }, { query: FETCH_BOARDS_COUNT }],
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
        {data?.fetchBoards.map((boardListItem: boardListItem, idx: number) => {
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
