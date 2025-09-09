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
    title: string,
    contents: string
}
