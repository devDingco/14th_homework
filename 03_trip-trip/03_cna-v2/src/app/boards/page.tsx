'use client'
import BoardsListComponent from 'components/boards-list/list'
import styles from './styles.module.css'
import Pagination from 'components/boards-list/pagination'
import { useQuery } from '@apollo/client'
import {
  FetchBoardsCountDocument,
  FetchBoardsCountQuery,
  FetchBoardsCountQueryVariables,
  FetchBoardsDocument,
  FetchBoardsQuery,
  FetchBoardsQueryVariables,
} from 'commons/graphql/graphql'
import { useState } from 'react'

export default function BoardsPage() {
  const { data, refetch } = useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(
    FetchBoardsDocument
  )
  const { data: dataBoardsCount } = useQuery<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>(
    FetchBoardsCountDocument
  )
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10)
  const [currentPage, setCurrentPage] = useState(1)

  if (!data || !dataBoardsCount) return <div>로딩 중 입니다</div>

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.boardFrame}>
          <BoardsListComponent
            data={data}
            dataBoardsCount={dataBoardsCount}
            currentPage={currentPage}
          />
          <Pagination
            refetch={refetch}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            lastPage={lastPage}
          />
        </div>
      </div>
    </div>
  )
}
