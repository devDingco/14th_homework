"use client"

import { useIsEdit } from "@/commons/provider/isEditProvider"
import BoardsWrite from "@/components/boards-write"
import { useEffect, useState } from "react"
import useBoardsEditPage from "./hook"

const BoardsEditPage = () => {
    const { setIsEdit, isEdit, postData, setPostData, setUpdatingTitle, setUpdatingContents} = useIsEdit()
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
        // updating... state 에 input 데이터 비교를 위해 저장
        if (fetchBoard) {
            setPostData({
                writer: fetchBoard.fetchBoard.writer,
                title: fetchBoard.fetchBoard.title,
                contents: fetchBoard.fetchBoard.contents,
            })
            setUpdatingTitle(fetchBoard?.fetchBoard.title)
            setUpdatingContents(fetchBoard?.fetchBoard.contents)
        }
    },[fetchBoard])

    useEffect(()=>{
        console.log('postData는? ', postData)
    },[postData])

    return (
        <BoardsWrite />
    )
}

export default BoardsEditPage