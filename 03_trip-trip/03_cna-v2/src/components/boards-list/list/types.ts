import { FetchBoardsCountQuery, FetchBoardsQuery } from 'commons/graphql/graphql'

export interface BoardListHookProps {
  hoveredId: string
}

export interface BoardsListProps {
  data: FetchBoardsQuery
  dataBoardsCount: FetchBoardsCountQuery
  currentPage: number
  keyword?: string
}
