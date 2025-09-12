import { ChangeEventHandler } from "react";

export interface IWriteInputProps {
    label: string,
    placeholder?: string,
    errMsg?: string
    setState?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
}
