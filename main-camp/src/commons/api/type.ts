import { CreateBoardCommentInput } from "../gql/graphql";

export interface IPostCreateBoardComment {
    boardId: string | string[],
    commentInput: CreateBoardCommentInput
}

export interface IUseFetchBoards {
    page: number
}

export interface IUseFetchBoardComments {
    page?: number
    boardId: string | string[]
}

export interface IUseFetchBoard {
    boardId: string | string[]
}