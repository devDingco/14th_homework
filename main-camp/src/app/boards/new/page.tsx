"use client"

import { useIsEdit } from "@/commons/isEditProvider"
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