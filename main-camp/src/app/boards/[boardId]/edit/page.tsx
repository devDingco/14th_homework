"use client"

import { useIsEdit } from "@/commons/provider/isEditProvider"
import BoardsWrite from "@/components/boards-write"
import { useEffect, useState } from "react"
import useFetchBoard from "@/commons/api/query/useFetchBoard"
import { useParams } from "next/navigation"
import WarningModal from "@/commons/modal/warning"

const BoardsEditPage = () => {
    const param = useParams()
    const { setIsEdit, isEdit, postData, setPostData, updatingBoardData, setUpdatingBoardData} = useIsEdit()
    const { boardDetail } = useFetchBoard(String(param.boardId))
    
    useEffect(() => {
        return () => {
            setIsEdit(false)
            setPostData({
                writer: "",
                title: "",
                contents: "",
                boardAddress: {
                    zipcode: "",
                    address: "",
                    addressDetail: "",
                },
                youtubeUrl: ""
            })
            setUpdatingBoardData({
                writer: "",
                title: "",
                contents: "",
                boardAddress: {
                    zipcode: "",
                    address: "",
                    addressDetail: "",
                },
                youtubeUrl: ""
            })
        }
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
        <>
            <BoardsWrite />
            <WarningModal />
        </>
    )
}

export default BoardsEditPage