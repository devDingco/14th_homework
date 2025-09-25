import { CreateBoardCommentInput } from "../gql/graphql"

export interface IIsEditContext {
    isEdit: boolean,
    setIsEdit: (t: boolean) => void,

    postData: IPostData,
    setPostData: (t: any) => void,
    updatingBoardData: IPostUpdateData,
    setUpdatingBoardData: (t: any) => void,
}

type typeBoardAddress = {
    zipcode: string,
    address: string,
    addressDetail?: string
}
export interface IPostData {
    writer: string | [k: string],
    password: string | [k: string],
    title: string | [k: string],
    contents: string | [k: string],
    boardAddress?: typeBoardAddress,
    youtubeUrl?: string
}

export interface IPostUpdateData {
    title: string | [k: string],
    contents: string | [k: string],
    boardAddress?: typeBoardAddress,
    youtubeUrl?: string
}

export interface IIsBoardDetailContext {
    isCommentEdit: IIsCommentEdit, 
    setIsCommentEdit: (t: IIsCommentEdit) => void,

    commentInput: CreateBoardCommentInput,
    setCommentInput: (t: any) => void,
    commentErr: ICommentErr,
    setCommentErr: (t: any) => void,
}

export interface ICommentErr {
    commentWriterErr: string,
    commentPasswordErr: string,
    commentContentsErr: string,
}
export interface IIsCommentEdit {
    isUpdate: boolean,
    commentId: number
}