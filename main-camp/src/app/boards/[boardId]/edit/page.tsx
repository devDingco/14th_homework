"use client"

import { useIsEdit } from "@/commons/provider/isEditProvider"
import BoardsWrite from "@/components/boards-write"
import { useEffect, useState } from "react"
import useFetchBoard from "@/commons/api/query/useFetchBoard"
import { useParams } from "next/navigation"
import WarningModal from "@/commons/modal/warning"
import { useIsModal } from "@/commons/provider/isModalProvider"

const BoardsEditPage = () => {
    const param = useParams()
    const { setIsEdit, isEdit, postData, setPostData, updatingBoardData, setUpdatingBoardData} = useIsEdit()
    const { setIsWarningModal } = useIsModal()
    const { boardDetail } = useFetchBoard(String(param.boardId))
    
    useEffect(() => {
        isEdit ? null : setIsWarningModal({open: true, value: '잘못된 접근입니다! 게시글에서 수정버튼을 눌러주세요!'})
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