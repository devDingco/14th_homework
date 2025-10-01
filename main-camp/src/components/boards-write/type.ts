import { Dispatch, SetStateAction } from "react"

export interface IPostUpdateData {
    fetchBoard : {
        writer: string,
        title: string,
        contents: string
    }
}

export interface IBoardsWriteProps {
    data?: IPostUpdateData
}

export interface IUpdateBoardInput {
    updateBoardInput: IOnUpdateHandler,
    password: string | null,
    boardId: string | string[]
}

export interface IFunctionUpdateBoard {
    writer?: string,
    title: string,
    contents: string
}

export interface IErrSetState {
    setWriterErr: Function,
    setPasswordErr: Function,
    setTitleErr: Function,
    setContentsErr: Function
}

export interface IOnChangePosting {
    category: "작성자" | "비밀번호" | "제목" | "내용" | "주소" | "유튜브링크" | "사진첨부"
}

export interface IOnUpdateHandler {
    title?: string,
    contents?: string
}

export interface IBoardErr {
    boardWriterErr: string,
    boardTitleErr: string,
    boardPasswordErr: string,
    boardContentsErr: string,
}

export interface IUseBoardWrite {
    setBoardErr: Dispatch<SetStateAction<IBoardErr>>
}