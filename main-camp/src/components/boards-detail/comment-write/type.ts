import { CreateBoardCommentInput } from "@/commons/gql/graphql"

export interface IOnChangeWriting {
    category: "작성자" | "비밀번호" | "내용"
}

export interface IBoardsCommentWrite {
    updatingInput?: CreateBoardCommentInput,
    boardCommentId?: string
}

export interface IUseBoardsCommentWrite {
    // setCommentErr: Dispatch<SetStateAction<ICommentErr>>
    // setCommentInput: Dispatch<SetStateAction<CreateBoardCommentInput>>
    // commentInput: CreateBoardCommentInput
}

export interface IOnClickCommentUpdate {
    updatingInput: CreateBoardCommentInput
    boardCommentId: string
}