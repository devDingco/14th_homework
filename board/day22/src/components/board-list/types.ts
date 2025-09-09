import {  FetchBoardsQuery } from "@/commons/graphql/graphql";

export interface IBoardsPageProps{
    data: FetchBoardsQuery
    el: FetchBoardsQuery
    index: Number
}