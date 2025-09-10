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
    title?: string,
    contents?: string,
    password: string | null,
    boardId: string | string[]
}

export interface IFunctionUpdateBoard {
    writer: string,
    password?: string | number,
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
    category: "작성자" | "비밀번호" | "제목" | "내용"
}