import { IPostData } from "@/commons/provider/type"

export interface IWriteButtonProps {
    onClickHandler?: (data?: any) => void | Promise<void>,
    p?: string
}

export interface IValObj {
    postData: IPostData
}