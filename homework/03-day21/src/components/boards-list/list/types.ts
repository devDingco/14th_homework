import { FetchBoardsQuery } from "@/commons/graphql/graphql"

export interface IBoardsPageProps {
    data?: FetchBoardsQuery;
}
export interface IFetchBoard {
    _id: string
    writer: string
    title: string
    createdAt: string
}