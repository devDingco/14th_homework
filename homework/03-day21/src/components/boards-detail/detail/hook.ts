"use client";

import { useQuery } from "@apollo/client"
import { useParams, useRouter } from 'next/navigation';
import { FETCH_BOARD } from './queries';


export default function useBoardsDetail() { 
    const router = useRouter()
    const { boardId } = useParams()
    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: boardId,
        },
    })

const onClickMove = () => {
    router.push(`/boards/${boardId}/edit`)
}

const onClickMoveList = () => {
    router.push('/boards')
}

    return{
        data,
        onClickMove,
        onClickMoveList,
    }
}

