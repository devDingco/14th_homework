"use client"

import createBoard from "@/commons/api/supabase/createBoard";
import deleteBoard from "@/commons/api/supabase/deleteBoard";
import getBoard from "@/commons/api/supabase/getBoard";
import getBoardDetail from "@/commons/api/supabase/getBoardDetail";
import updateBoard from "@/commons/api/supabase/updateBoard";
import { Dispatch, SetStateAction, useState } from "react";
import { IPostSupaData } from ".";

export interface IUseMyApisList {
    isModalOpen: boolean, 
    setIsModalOpen: (t: boolean) => void
    postSupaData: IPostSupaData
    setPostSupaData: Dispatch<SetStateAction<IPostSupaData>>
}

const useMyApisList = (props:IUseMyApisList) => {
    
    const onClickSubmit = async () => {
        console.log(props.postSupaData)
        // console.log(new Date().getTime())
        const { data } = await createBoard({
            writer: props.postSupaData.writer,
            title: props.postSupaData.title,
            contents: props.postSupaData.contents
        })
        console.log(data)
    }
    
    const onClickFetch = async () => {
        const { data } = await getBoard()
        console.log(data)
    }

    const onClickFetchDetail = async () => {
        const { data } = await getBoardDetail()
        console.log(data)
    }

    const onClickUpdate = async () => {
        const { data } = await updateBoard()
        console.log(data)
    }

    const onClickDelete = async () => {
        const { data } = await deleteBoard()
        console.log(data)
    }

    // const result =  supabase.from("board").delete()
    // const result =  supabase.from("board").update()

    return {
        onClickSubmit,
        onClickFetch,
        onClickFetchDetail,
        onClickUpdate,
        onClickDelete
    }
}

export default useMyApisList