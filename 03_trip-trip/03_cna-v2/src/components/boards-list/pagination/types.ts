import { ApolloQueryResult } from '@apollo/client'
import { FetchBoardsQuery, FetchBoardsQueryVariables } from 'commons/graphql/graphql'
import { Dispatch, SetStateAction } from 'react'

export interface PaginationProps {
  refetch: (
    variables?: Partial<FetchBoardsQueryVariables>
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  lastPage: number
  currentPage: number
}

export interface PaginationHookProps {
  refetch: (
    variables?: Partial<FetchBoardsQueryVariables>
  ) => Promise<ApolloQueryResult<FetchBoardsQuery>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  lastPage: number
}
