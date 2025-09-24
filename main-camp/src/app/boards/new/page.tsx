"use client"

import { useIsEdit } from "@/commons/provider/isEditProvider"
import { IsModalProvider } from "@/commons/provider/isModalProvider"
import BoardsWrite from "@/components/boards-write"
import { useEffect } from "react"

const BoardNewPage = () => {
    const { setIsEdit } = useIsEdit()
    useEffect(()=>{
        setIsEdit(false)
    },[])
    return (
        <BoardsWrite />
    )
}

export default BoardNewPage