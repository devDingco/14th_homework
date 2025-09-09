"use client"

import { createContext, ReactNode, useContext, useState } from "react"

const IsEditContext = createContext<any>(null)

export const IsEditProvider = ( {children}: { children:ReactNode } ) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [writer, setWriter] = useState<string | undefined>("")
    const [password, setPassword] = useState<string | number>("")
    const [title, setTitle] = useState<string | undefined>("")
    const [contents, setContents] = useState<string | undefined>("")

    return (
        <IsEditContext.Provider value={{ 
            isEdit, setIsEdit,
            writer, setWriter,
            password, setPassword,
            title, setTitle,
            contents, setContents
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

