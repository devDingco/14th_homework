import { FetchBoardQuery } from '@/gql/graphql';

export interface IMyvariables {
    boardId: string
    password: string
    updateBoardInput: {
      title?: string
      contents?: string
    }
  }
  
export interface IBoardWriteProps {
    isEdit : boolean
    data? : FetchBoardQuery
}