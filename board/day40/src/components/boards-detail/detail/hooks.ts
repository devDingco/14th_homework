"use client"

import { useParams, useRouter } from 'next/navigation'

import {  useMutation, useQuery } from '@apollo/client'
import { FetchBoardDocument, FetchBoardQuery, FetchBoardQueryVariables } from '@/commons/graphql/graphql';
import { useState } from 'react';
import { DISLIKE_BOARD, FETCH_BOARD, LIKE_BOARD } from './queries';




export default function useBoardsDetail () {
    const PageNumber = useParams()
    const router = useRouter()
    const [disLike, setdisLike] = useState(0)
    const [Like, setLike] = useState(0)



    const { data } = useQuery<FetchBoardQuery, FetchBoardQueryVariables>(FetchBoardDocument, {
        variables: {
            boardId: String(PageNumber.id) ,
        }
    })
    const [ likeBoard ] = useMutation(LIKE_BOARD)
    const [ dislikeBoard ] = useMutation(DISLIKE_BOARD)



    const onClickMove = () => {
        router.push(`/boards/${PageNumber.id}/edit`)
    }

    const onClickdisLike = async() => {
        
        await dislikeBoard({
            variables: {
                boardId: PageNumber.id
            },refetchQueries: [
                {query: FETCH_BOARD,
                    variables: {boardId: PageNumber.id}
                }
            ]
        })
    }

    const onClickLike = async () => {
        await likeBoard({
            variables: {
                boardId: PageNumber.id
            },refetchQueries: [
                {query: FETCH_BOARD,
                    variables: {boardId: PageNumber.id}
                }
            ]
        })
    }

    return {
        onClickMove,
        data,
        onClickdisLike,
        onClickLike
    }

}
