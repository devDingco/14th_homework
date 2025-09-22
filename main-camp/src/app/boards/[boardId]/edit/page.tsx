"use client"

import { useIsEdit } from "@/commons/provider/isEditProvider"
import BoardsWrite from "@/components/boards-write"
import { useEffect, useState } from "react"
import useBoardsEditPage from "./hook"

const BoardsEditPage = () => {
    const { setIsEdit, isEdit, postData, setPostData, updatingBoardData, setUpdatingBoardData} = useIsEdit()
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
                boardAddress: {
                    zipcode: fetchBoard.fetchBoard.boardAddress?.zipcode,
                    address: fetchBoard.fetchBoard.boardAddress?.address,
                    addressDetail: fetchBoard.fetchBoard.boardAddress?.addressDetail,
                },
                youtubeUrl: fetchBoard.fetchBoard?.youtubeUrl
            })
            setUpdatingBoardData({
                title: fetchBoard.fetchBoard.title,
                contents: fetchBoard.fetchBoard.contents,
                boardAddress: {
                    zipcode: fetchBoard.fetchBoard.boardAddress?.zipcode,
                    address: fetchBoard.fetchBoard.boardAddress?.address,
                    addressDetail: fetchBoard.fetchBoard.boardAddress?.addressDetail,
                },
                youtubeUrl: fetchBoard.fetchBoard?.youtubeUrl
            })
        }
    },[fetchBoard])

    useEffect(()=>{
        console.log('postData는? ', postData)
    },[postData])

    useEffect(()=>{
        console.log('updateData는? ', updatingBoardData)
    },[updatingBoardData])
    
    return (
        <BoardsWrite />
    )
}

export default BoardsEditPage