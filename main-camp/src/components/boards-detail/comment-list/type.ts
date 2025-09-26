import { FetchBoardCommentsQuery } from "@/commons/gql/graphql";

export interface IUseBoardCommentList {
    setComments: React.Dispatch<React.SetStateAction<any>>
}

export interface IBoardsCommentList {
    boardComments: FetchBoardCommentsQuery["fetchBoardComments"] | undefined,
    boardCommentsFetchMore: Function | undefined
}

export interface IScrollInfiniteFetchComments {
    boardComments: FetchBoardCommentsQuery["fetchBoardComments"] | undefined,
    boardCommentsFetchMore: Function | undefined
}

export interface IOnClickCommentUpdateHandler {
    event: React.MouseEvent<HTMLImageElement>,
    boardComment: {
        _id: string;
        writer?: string | null;
        contents: string;
        createdAt: any;
        rating: number;
    }
}

export interface IOnClickCommentDeleteHandler {
    event: React.MouseEvent<HTMLImageElement>,
    page: number
}