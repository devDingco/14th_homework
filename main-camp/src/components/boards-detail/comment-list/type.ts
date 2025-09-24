import { FetchBoardCommentsQuery } from "@/commons/gql/graphql";

export interface IUseBoardCommentList {
    setComments: React.Dispatch<React.SetStateAction<any>>
}

export interface IBoardsCommentList {
    boardComments: FetchBoardCommentsQuery["fetchBoardComments"] | undefined,
    boardCommentsFetchMore: Function | undefined
}
