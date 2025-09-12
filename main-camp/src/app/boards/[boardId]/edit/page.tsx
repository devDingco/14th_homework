"use client"

import { IsEditProvider, useIsEdit } from "@/commons/isEditProvider"
import BoardsWrite from "@/components/boards-write"
import useBoardWrite from "@/components/boards-write/hook"
import { gql, useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import useBoardsEditPage from "./hook"

const BoardsEditPage = () => {
    const { setIsEdit, writer, setWriter, title, setTitle, password, setPassword, contents, setContents, updatingTitle, setUpdatingTitle, updatingContents, setUpdatingContents} = useIsEdit()
    const { fetchBoard } = useBoardsEditPage()

    useEffect(()=>{
        setIsEdit(true)
    },[])

    useEffect(()=>{
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
        <BoardsWrite data={fetchBoard}/>
    )
}

export default BoardsEditPage