"use client"

import { useIsEdit } from "@/commons/isEditProvider"
import BoardsWrite from "@/components/boards-write"
import { useEffect, useState } from "react"
import useBoardsEditPage from "./hook"

const BoardsEditPage = () => {
    const { setIsEdit, isEdit, setWriter, setTitle, setContents, setUpdatingTitle, setUpdatingContents} = useIsEdit()
    const { getBoardDetail } = useBoardsEditPage()

    const [fetchBoard, setFetchBoard] = useState<any>()

    useEffect(()=>{
        setIsEdit(true)
    },[])

    useEffect(()=>{
        (async ()=>{
            setFetchBoard(await getBoardDetail())
        })()
    },[isEdit])

    useEffect(()=>{
        console.log(fetchBoard)
        // updating... state 에 input 데이터 비교를 위해 저장
        if (fetchBoard) {
            setWriter(fetchBoard?.fetchBoard.writer)
            setTitle(fetchBoard?.fetchBoard.title)
            setContents(fetchBoard?.fetchBoard.contents)     
            setUpdatingTitle(fetchBoard?.fetchBoard.title)
            setUpdatingContents(fetchBoard?.fetchBoard.contents)
        }
    },[fetchBoard])

    return (
        <BoardsWrite />
    )
}

export default BoardsEditPage