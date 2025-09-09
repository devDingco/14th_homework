import { ChangeEventHandler } from "react";

type fetchBoard = {
    fetchBoard : {
        writer: string,
        title: string,
        contents: string
    }
}

export interface IWriteInputProps {
    data?: fetchBoard,
    label: string,
    placeholder?: string,
    errMsg?: string
    setState?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
}
