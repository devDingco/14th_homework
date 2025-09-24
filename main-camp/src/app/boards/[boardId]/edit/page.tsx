"use client"

import { useIsEdit } from "@/commons/provider/isEditProvider"
import BoardsWrite from "@/components/boards-write"
import { useEffect, useState } from "react"
import useFetchBoard from "@/commons/api/query/useFetchBoard"
import { useParams } from "next/navigation"

const BoardsEditPage = () => {
    const param = useParams()
    const { setIsEdit, isEdit, postData, setPostData, updatingBoardData, setUpdatingBoardData} = useIsEdit()
    const { boardDetail } = useFetchBoard(String(param.boardId))

    useEffect(()=>{
        setIsEdit(true)
    },[])

    useEffect(()=>{
        setPostData({
            writer: boardDetail?.writer,
            title: boardDetail?.title,
            contents: boardDetail?.contents,
            boardAddress: {
                zipcode: boardDetail?.boardAddress?.zipcode,
                address: boardDetail?.boardAddress?.address,
                addressDetail: boardDetail?.boardAddress?.addressDetail,
            },
            youtubeUrl: boardDetail?.youtubeUrl
        })
        setUpdatingBoardData({
            title: boardDetail?.title,
            contents: boardDetail?.contents,
            boardAddress: {
                zipcode: boardDetail?.boardAddress?.zipcode,
                address: boardDetail?.boardAddress?.address,
                addressDetail: boardDetail?.boardAddress?.addressDetail,
            },
            youtubeUrl: boardDetail?.youtubeUrl
        })
    },[boardDetail && isEdit])

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