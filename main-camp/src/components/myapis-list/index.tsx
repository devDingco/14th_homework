"use client"

import SubmitModal from "@/commons/modal/supabase/submitModal"
import useMyApisList from "./hook"
import { useState } from "react"

export interface IPostSupaData {
    writer: string,
    title: string,
    contents: string
}

const MyApisList = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [postSupaData, setPostSupaData] = useState<IPostSupaData>({
        writer: "",
        title: "",
        contents: ""
    })

    const { onClickDelete, onClickFetch, onClickFetchDetail, onClickUpdate, onClickSubmit} 
    = useMyApisList({isModalOpen, setIsModalOpen, postSupaData, setPostSupaData})
    
    return (
        <>
            <div>
                <button onClick={() => setIsModalOpen(true)}>등록</button>
                <button onClick={onClickFetch}>조회</button>
                <button onClick={onClickFetchDetail}>상세조회</button>
                <button onClick={onClickUpdate}>수정</button>
                <button onClick={onClickDelete}>삭제</button>
            </div>
            <SubmitModal 
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                onClickSubmit={onClickSubmit}
                postSupaData={postSupaData}
                setPostSupaData={setPostSupaData}
            />
        </>
    )
}

export default MyApisList