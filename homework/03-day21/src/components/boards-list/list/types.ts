import { FetchBoardsQuery } from "@/commons/graphql/graphql"

export interface IBoardsPageProps {
    data?: FetchBoardsQuery;
    currentPage?: number;
    boardsCount?: number
}
export interface IFetchBoard {
    _id: string
    writer: string
    title: string
    createdAt: string
}