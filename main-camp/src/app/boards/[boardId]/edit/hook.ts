"use client"

import { useIsEdit } from "@/commons/isEditProvider"
import { FETCH_BOARD } from "@/components/boards-detail/queries"
import { useQuery } from "@apollo/client"
import { useParams } from "next/navigation"

const useBoardsEditPage = () => {
    const param = useParams()
    const { isEdit } = useIsEdit()
    let fetchBoard
    try {
        fetchBoard = useQuery(FETCH_BOARD, {
            variables: {
                boardId: param.boardId,
            },
            skip: !isEdit
        }).data
    } catch(e) {
        console.log(e)
    }
    
    return {
        fetchBoard
    }
}

export default useBoardsEditPage