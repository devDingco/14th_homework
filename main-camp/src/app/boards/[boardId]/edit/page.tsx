"use client"

import { IsEditProvider, useIsEdit } from "@/commons/isEditProvider"
import BoardsWrite from "@/components/boards-write"
import useBoardWrite from "@/components/boards-write/hook"
import { gql, useQuery } from "@apollo/client"
import { useParams } from "next/navigation"
import { useEffect } from "react"

const FETCH_BOARD = gql`
    query fetchBoard($boardId: ID!) {
        fetchBoard(boardId: $boardId) {
            _id
            writer
            title
            contents
            createdAt
        }
    }
`

const BoardsEditPage = () => {
    const param = useParams()
    const { isEdit, setIsEdit, writer, setWriter, title, setTitle, password, setPassword, contents, setContents } = useIsEdit()
    const { data } = useQuery(FETCH_BOARD, {
        variables: {
            boardId: param.boardId,
        },
        skip: !isEdit
    })

    useEffect(()=>{
        setIsEdit(true)
    },[])

    useEffect(()=>{
        if (data) {
            setWriter(data?.fetchBoard.writer)
            setTitle(data?.fetchBoard.title)
            setContents(data?.fetchBoard.contents)
        }
    },[data])

    return (
        <BoardsWrite data={data}/>
    )
}

export default BoardsEditPage