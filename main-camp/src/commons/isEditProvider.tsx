"use client"

import { createContext, ReactNode, useContext, useState } from "react"

interface IIsEditContext {
    isEdit: boolean,
    setIsEdit: (t: boolean) => void,
    writer: string,
    setWriter: (t: string) => void,
    password: string | number,
    setPassword: (t: string | number) => void,
    title: string,
    setTitle: (t: string) => void,
    contents: string,
    setContents: (t: string) => void,
    updatingTitle: string | undefined,
    setUpdatingTitle: (t: string | undefined) => void,
    updatingContents: string | undefined,
    setUpdatingContents: (t: string | undefined) => void,
}

const IsEditContext = createContext<IIsEditContext | undefined>(undefined)

export const IsEditProvider = ( {children}: { children:ReactNode } ) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [writer, setWriter] = useState<string>("")
    const [password, setPassword] = useState<string | number>("")
    const [title, setTitle] = useState<string>("")
    const [contents, setContents] = useState<string>("")

    const [updatingTitle, setUpdatingTitle] = useState<string | undefined>("")
    const [updatingContents, setUpdatingContents] = useState<string | undefined>("")

    return (
        <IsEditContext.Provider value={{ 
            isEdit, setIsEdit,
            writer, setWriter,
            password, setPassword,
            title, setTitle,
            contents, setContents,
            updatingTitle, setUpdatingTitle,
            updatingContents, setUpdatingContents
        }}>
            {children}
        </IsEditContext.Provider>
    )
}

export const useIsEdit = () => {
    const context = useContext(IsEditContext)
    if(!context) throw new Error("useIsEdit 는 IsEditProvider 안에서만 사용 가능합니다.")
    return context
}

