"use client";

import { useQuery } from "@apollo/client"
import { useParams, useRouter } from 'next/navigation';
import { FetchBoardDocument } from "@/commons/graphql/graphql";


export default function useBoardsDetail() { 
    const router = useRouter()
    const { boardId } = useParams()
    const { data } = useQuery(FetchBoardDocument, {
        variables: {
            boardId: boardId,
        },
    })

     // 주소를 한 번 정의
     const address = data?.fetchBoard?.boardAddress?.address ?? "주소 없음"


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
        address,
    }
}

