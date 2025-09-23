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
import { ChangeEvent, useState, useEffect } from 'react'
import BoardsSearch from 'components/boards-list/search'

export default function BoardsPage() {
  const [keyword, setKeyword] = useState('')

  const { data, refetch } = useQuery<FetchBoardsQuery, FetchBoardsQueryVariables>(
    FetchBoardsDocument,
    { variables: { search: keyword } }
  )
  const { data: dataBoardsCount } = useQuery<FetchBoardsCountQuery, FetchBoardsCountQueryVariables>(
    FetchBoardsCountDocument,
    { variables: { search: keyword } }
  )
  const lastPage = Math.ceil((dataBoardsCount?.fetchBoardsCount ?? 10) / 10)
  const [currentPage, setCurrentPage] = useState(1)

  if (!data || !dataBoardsCount) return <div>로딩 중 입니다</div>

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <h1>트립토크 게시판</h1>
        <BoardsSearch keyword={keyword} refetch={refetch} setKeyword={setKeyword} />
        <div className={styles.boardFrame}>
          <BoardsListComponent
            data={data}
            dataBoardsCount={dataBoardsCount}
            currentPage={currentPage}
            keyword={keyword}
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
