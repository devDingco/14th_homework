"use client"

import { createContext, ReactNode, useContext, useState } from "react"
import { CreateBoardCommentInput } from "../gql/graphql"
import { ICommentErr, IIsBoardDetailContext, IIsCommentEdit } from "./type"

const IsBoardDetailContext = createContext<IIsBoardDetailContext | undefined>(undefined)

export const IsBoardDetailProvider = ( {children}: { children:ReactNode } ) => {
    const [isCommentEdit, setIsCommentEdit] = useState<IIsCommentEdit>({
        isUpdate: false,
        commentId: 0
    })
    
    const [commentInput, setCommentInput] = useState<CreateBoardCommentInput>({
        writer: "",
        contents: "",
        password: "",
        rating: 1,
    })

    const [commentErr, setCommentErr] = useState<ICommentErr>({
        commentWriterErr: "",
        commentPasswordErr: "",
        commentContentsErr: ""
    })

    return (
        <IsBoardDetailContext.Provider value={{
            commentInput, setCommentInput,
            commentErr, setCommentErr,
            isCommentEdit, setIsCommentEdit
        }}>
            {children}
        </IsBoardDetailContext.Provider>
    )
}

export const useIsBoardDetail = () => {
    const context = useContext(IsBoardDetailContext)
    if(!context) throw new Error("useIsModal 는 IsBoardDetailContext 안에서만 사용 가능합니다.")
    return context
}