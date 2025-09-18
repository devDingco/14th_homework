"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { IIsEditContext, IPostData } from "./type"

const IsEditContext = createContext<IIsEditContext | undefined>(undefined)

export const IsEditProvider = ( {children}: { children:ReactNode } ) => {
    const [isEdit, setIsEdit] = useState<boolean>(false)

    const [postData, setPostData] = useState<IPostData>({
        writer: "",
        password: "",
        title: "",
        contents: "",
        boardAddress: {
            zipcode: "",
            address: ""
        },
        youtubeUrl: ""
    })

    const [updatingTitle, setUpdatingTitle] = useState<string | undefined>()
    const [updatingContents, setUpdatingContents] = useState<string | undefined>("")

    return (
        <IsEditContext.Provider value={{ 
            isEdit, setIsEdit,
            
            updatingTitle, setUpdatingTitle,
            updatingContents, setUpdatingContents,
            
            postData, setPostData
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

