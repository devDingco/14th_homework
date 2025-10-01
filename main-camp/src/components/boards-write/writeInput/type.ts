import { ChangeEventHandler, MutableRefObject, RefObject } from "react";

export interface IWriteInputProps {
    label: string,
    placeholder?: string,
    errMsg?: string
    setState?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
    isModalOpen?: boolean,
    setIsModalOpen?: React.Dispatch<React.SetStateAction<any>>,
    onClickImage?: (index: number) => void,
    onClickImageDelete?: (index: number) => void,
    fileRef?: MutableRefObject<(HTMLInputElement | null)[]>,
}
