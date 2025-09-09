"use client"

import { useParams, useRouter } from 'next/navigation'

import {  useQuery } from '@apollo/client'
import { FetchBoardDocument, FetchBoardQuery, FetchBoardQueryVariables } from '@/commons/graphql/graphql';




export default function useBoardsDetail () {
    const PageNumber = useParams()
    const router = useRouter()



    const { data } = useQuery<FetchBoardQuery, FetchBoardQueryVariables>(FetchBoardDocument, {
        variables: {
            boardId: String(PageNumber.id) ,
        }
    })


    const onClickMove = () => {
        router.push(`/boards/${PageNumber.id}/edit`)
    }

    return {
        onClickMove,
        data
    }

}
