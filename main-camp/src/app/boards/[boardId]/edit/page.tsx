"use client"

import { useIsEdit } from "@/commons/provider/isEditProvider"
import BoardsWrite from "@/components/boards-write"
import { useEffect, useState } from "react"
import useBoardsEditPage from "./hook"
import { FetchBoardQuery } from "@/commons/gql/graphql"

const BoardsEditPage = () => {
    const { setIsEdit, isEdit, postData, setPostData, updatingBoardData, setUpdatingBoardData} = useIsEdit()
    const { getBoardDetail } = useBoardsEditPage()

    const [boardData, setBoardData] = useState<FetchBoardQuery>()

    useEffect(()=>{
        setIsEdit(true)
    },[])

    useEffect(()=>{
        (async ()=>{
            setBoardData(await getBoardDetail())
        })()
    },[isEdit])

    useEffect(()=>{
        // updating... state 에 input 데이터 비교를 위해 저장
        if (boardData) {
            setPostData({
                writer: boardData.fetchBoard.writer,
                title: boardData.fetchBoard.title,
                contents: boardData.fetchBoard.contents,
                boardAddress: {
                    zipcode: boardData.fetchBoard.boardAddress?.zipcode,
                    address: boardData.fetchBoard.boardAddress?.address,
                    addressDetail: boardData.fetchBoard.boardAddress?.addressDetail,
                },
                youtubeUrl: boardData.fetchBoard?.youtubeUrl
            })
            setUpdatingBoardData({
                title: boardData.fetchBoard.title,
                contents: boardData.fetchBoard.contents,
                boardAddress: {
                    zipcode: boardData.fetchBoard.boardAddress?.zipcode,
                    address: boardData.fetchBoard.boardAddress?.address,
                    addressDetail: boardData.fetchBoard.boardAddress?.addressDetail,
                },
                youtubeUrl: boardData.fetchBoard?.youtubeUrl
            })
        }
    },[boardData])

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