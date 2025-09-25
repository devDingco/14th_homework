import { IBoardDetailData } from "@/app/boards/[boardId]/page"
import { CreateBoardCommentInput } from "@/commons/gql/graphql"
import { Dispatch, SetStateAction } from "react"

export interface IOnChangeWriting {
    category: "작성자" | "비밀번호" | "내용"
}

export interface IBoardsCommentWrite {
    boardDetailData: IBoardDetailData | undefined
}

export interface ICommentErr {
    commentWriterErr: string,
    commentPasswordErr: string,
    commentContentsErr: string,
}

export interface IUseBoardsCommentWrite {
    setCommentErr: Dispatch<SetStateAction<ICommentErr>>
    setCommentInput: Dispatch<SetStateAction<CreateBoardCommentInput>>
    commentInput: CreateBoardCommentInput
}