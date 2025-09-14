import { IFunctionUpdateBoard } from "../type"

export interface IWriteButtonProps {
    onClickHandler?: (data?: IFunctionUpdateBoard) => void | Promise<void>,
    postData?: IFunctionUpdateBoard,
    p?: string
}

export interface IValObj {
    writer: string,
    password: string | number,
    title: string,
    contents: string
}